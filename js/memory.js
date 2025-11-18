/* IMAGENS */
const cards = [
  { name: "goku", img: "assets/game-memory-img/goku.jpg" },
  { name: "vegeta", img: "assets/game-memory-img/vegeta.jpg" },
  { name: "gohan", img: "assets/game-memory-img/gohan.jpg" },
  { name: "trunks", img: "assets/game-memory-img/trunks.jpg" },
  { name: "freeza", img: "assets/game-memory-img/freeza.jpg" },
  { name: "piccolo", img: "assets/game-memory-img/piccolo.jpg" },
];

document.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");
  const timerEl = document.getElementById("timer");
  const scoreEl = document.getElementById("score");

  const restartBtn = document.getElementById("restartBtn");

  // ========= MODAIS =========
  const winModal = document.getElementById("winModal");
  const loseModal = document.getElementById("loseModal");
  const rankModal = document.getElementById("rankModal");

  const saveScoreBtn = document.getElementById("saveScoreBtn");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const tryAgainBtn = document.getElementById("tryAgainBtn");
  const backMenuBtn = document.getElementById("backMenuBtn");
  const closeRankBtn = document.getElementById("closeRankBtn");
  const clearRankBtn = document.getElementById("clearRankBtn");

  const finalScoreEl = document.getElementById("finalScore");

  const playerNameInput = document.getElementById("playerName");

  const sfxCorrect = document.getElementById("sfx-correct");
  const sfxWrong = document.getElementById("sfx-wrong");
  const sfxWin = document.getElementById("sfx-win");
  const sfxLose = document.getElementById("sfx-lose");

  const showRankBtn = document.getElementById("showRankBtn");

  //FORÇA O VÍDEO WPP DO HTML A NÃO PARAR
  const video = document.getElementById("bgVideo");

  video.addEventListener("loadeddata", () => {
    video.play().catch(() => {
      console.log("Autoplay bloqueado, tentando novamente...");
      setTimeout(() => video.play(), 500);
    });
  });

  let firstCard = null;
  let lockBoard = false;
  let matched = 0;
  let score = 0;
  let timeLeft = parseInt(document.getElementById("difficulty").value);
  let timer;
  let selectedCards = []; // <--- ADICIONAR

  showRankBtn.addEventListener("click", () => {
    loadRanking(); // carrega a tabela
    showModal(rankModal); // abre a modal do ranking
  });

  function showModal(modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function hideModal(modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  // ========= SALVAR NO RANKING =========
  function saveScore() {
    const nameInput = document.getElementById("playerName");
    const finalScore = parseInt(
      document.getElementById("finalScore").textContent
    );

    if (nameInput.value.trim() === "") {
      alert("Digite um nome!");
      return;
    }

    let ranking = JSON.parse(localStorage.getItem("rankingDB")) || [];

    ranking.push({
      name: nameInput.value,
      score: finalScore,
    });

    ranking.sort((a, b) => b.score - a.score);
    ranking = ranking.slice(0, 5);

    localStorage.setItem("rankingDB", JSON.stringify(ranking));

    hideModal(winModal);
    loadRanking();
    showModal(rankModal);
  }

  // ========= CARREGAR RANKING =========
  function loadRanking() {
    const ranking = JSON.parse(localStorage.getItem("rankingDB")) || [];
    const tbody = document.querySelector("#rankingTable tbody");

    tbody.innerHTML = "";

    ranking.forEach((item, index) => {
      const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.score}</td>
            </tr>
        `;
      tbody.innerHTML += row;
    });
  }

  // ========= EVENTOS DOS BOTÕES =========

  // SALVAR
  saveScoreBtn.addEventListener("click", saveScore);

  // JOGAR DE NOVO (vitória)
  playAgainBtn.addEventListener("click", () => {
    hideModal(winModal);
    startGame(); // reinicia o jogo
  });

  // TENTAR DE NOVO (derrota)
  tryAgainBtn.addEventListener("click", () => {
    hideModal(loseModal);
    startGame();
  });

  // VOLTAR PARA O MENU
  backMenuBtn.addEventListener("click", () => {
    hideModal(loseModal);
    document.getElementById("menu").style.display = "block";
  });

  // FECHAR RANKING
  closeRankBtn.addEventListener("click", () => hideModal(rankModal));

  // LIMPAR RANKING
  clearRankBtn.addEventListener("click", () => {
    localStorage.removeItem("rankingDB");
    loadRanking();
  });

  function startGame() {
    clearInterval(timer);

    matched = 0;
    score = 0;
    firstCard = null;
    lockBoard = false;
    timer = null;
    scoreEl.textContent = score;

    const difficulty = document.getElementById("difficulty").value;
    const gameEl = document.getElementById("game");

    // limpa classes do grid (medium) — será reaplicada se precisar
    gameEl.classList.remove("medium");

    // remove classes de dificuldade no body e reaplica a correta
    document.body.classList.remove("diff-medium", "diff-hard");

    if (difficulty === "medium") {
      // medium usa só as cartas padrão
      selectedCards = [...cards];
      timeLeft = 30;
      gameEl.classList.add("medium"); // força 4 colunas no grid
      document.body.classList.add("diff-medium");
    } else if (difficulty === "hard") {
      // hard usa conjunto maior
      selectedCards = [
        ...cards,
        { name: "broly", img: "assets/game-memory-img/broly.jpg" },
        { name: "gotenks", img: "assets/game-memory-img/gotenks.jpg" },
        { name: "popoo", img: "assets/game-memory-img/popo.jpg" },
        { name: "karin", img: "assets/game-memory-img/karin.jpg" },
        { name: "black", img: "assets/game-memory-img/black.jpg" },
        { name: "boo", img: "assets/game-memory-img/boo.jpg" },
        { name: "bills", img: "assets/game-memory-img/bills.jpg" },
        { name: "whis", img: "assets/game-memory-img/whis.jpg" },
      ];
      timeLeft = 60;
      // modo hard usa grid automático (nenhuma classe extra no .game)
      document.body.classList.add("diff-hard");
    } else {
      // fallback
      selectedCards = [...cards];
      timeLeft = 30;
      gameEl.classList.add("medium");
      document.body.classList.add("diff-medium");
    }

    timerEl.textContent = "--";
    generateBoard();
  }

  function generateBoard() {
    game.innerHTML = "";

    const list = [...selectedCards, ...selectedCards]; // agora existe
    list.sort(() => Math.random() - 0.5);

    list.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.classList.add("card");
      cardEl.dataset.name = card.name;

      cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front"></div>
        <div class="card-face card-back"><img src="${card.img}" alt="${card.name}" /></div>
      </div>
    `;

      cardEl.addEventListener("click", () => flipCard(cardEl));
      game.appendChild(cardEl);
    });
  }

  function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add("flip");

    if (!firstCard) {
      firstCard = card;
      if (!timer) startTimer();
      return;
    }

    lockBoard = true;
    checkMatch(card);
  }

  //SISTEMA DE PONTOS
  function checkMatch(secondCard) {
    if (firstCard.dataset.name === secondCard.dataset.name) {
      sfxCorrect.play();
      matched += 1;
      score += 100;
      scoreEl.textContent = score;

      firstCard = null;
      lockBoard = false;

      if (matched === selectedCards.length) {
        clearInterval(timer);
        sfxWin.play();
        openWinModal();
      }
    } else {
      sfxWrong.play();

      // 🔥 penalidade por erro:
      score -= 30;
      if (score < 0) score = 0;
      scoreEl.textContent = score;

      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        firstCard = null;
        lockBoard = false;
      }, 700);
    }
  }

  function startTimer() {
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        sfxLose.play();
        openLoseModal();
      }
    }, 1000);
  }

  function openWinModal() {
    finalScoreEl.textContent = score;
    winModal.setAttribute("aria-hidden", "false");
  }

  function openLoseModal() {
    loseModal.setAttribute("aria-hidden", "false");
  }

  function closeModals() {
    winModal.setAttribute("aria-hidden", "true");
    loseModal.setAttribute("aria-hidden", "true");
  }

  restartBtn.onclick = startGame;
  playAgainBtn.onclick = startGame;
  tryAgainBtn.onclick = startGame;

  // 🔹 Aqui entra o listener da dificuldade
  document.getElementById("difficulty").addEventListener("change", startGame);

  startGame();
});

// const cardsData = [
//   { name: "goku", img: "assets/game-memory-img/goku.jpg" },
//   { name: "vegeta", img: "assets/game-memory-img/vegeta.jpg" },
//   { name: "gohan", img: "assets/game-memory-img/gohan.jpg" },
//   { name: "trunks", img: "assets/game-memory-img/trunks.jpg" },
//   { name: "broly", img: "assets/game-memory-img/freeza.jpg" },
//   { name: "piccolo", img: "assets/game-memory-img/piccolo.jpg" }
// ];

// let gameContainer, timerEl, scoreEl;
// let timeLeft = 30;
// let score = 0;
// let timerInterval;
// let firstClick = false;
// let flippedCards = [];
// let matchedCards = [];

// function initMemoryGame() {
//   gameContainer = document.getElementById("game");
//   timerEl = document.getElementById("timer");
//   scoreEl = document.getElementById("score");

//   document.getElementById("restartBtn").addEventListener("click", restartGame);
//   document.getElementById("difficulty").addEventListener("change", changeDifficulty);

//   document.getElementById("showRankBtn").addEventListener("click", () => openModal("rankModal"));
//   document.getElementById("closeRankBtn").addEventListener("click", () => closeModal("rankModal"));
//   document.getElementById("clearRankBtn").addEventListener("click", clearRanking);

//   document.getElementById("saveScoreBtn").addEventListener("click", saveScore);
//   document.getElementById("playAgainBtn").addEventListener("click", () => {
//     closeModal("winModal");
//     restartGame();
//   });

//   document.getElementById("tryAgainBtn").addEventListener("click", () => {
//     closeModal("loseModal");
//     restartGame();
//   });

//   document.getElementById("backMenuBtn").addEventListener("click", () => {
//     closeModal("loseModal");
//   });

//   startGame();
// }

// function startGame() {
//   score = 0;
//   timeLeft = parseInt(document.getElementById("difficulty").value);
//   firstClick = false;
//   flippedCards = [];
//   matchedCards = [];
//   scoreEl.textContent = score;
//   timerEl.textContent = "--";
//   gameContainer.innerHTML = "";

//   const gameCards = [...cardsData, ...cardsData]; // duplicar cartas
//   shuffleArray(gameCards);

//   gameCards.forEach(card => {
//     const cardEl = document.createElement("div");
//     cardEl.classList.add("card");
//     cardEl.dataset.name = card.name;

//     cardEl.innerHTML = `
//       <div class="card-front"></div>
//       <div class="card-back"><img src="${card.img}" alt="${card.name}" /></div>
//     `;

//     cardEl.addEventListener("click", () => flipCard(cardEl));
//     gameContainer.appendChild(cardEl);
//   });
// }

// function flipCard(card) {
//   if (!firstClick) startTimer();
//   firstClick = true;

//   if (flippedCards.length === 2 || card.classList.contains("flipped") || matchedCards.includes(card)) return;

//   card.classList.add("flipped");
//   flippedCards.push(card);

//   if (flippedCards.length === 2) {
//     checkMatch();
//   }
// }

// function checkMatch() {
//   const [card1, card2] = flippedCards;

//   if (card1.dataset.name === card2.dataset.name) {
//     matchedCards.push(card1, card2);
//     score += 10;
//     playSound("sfx-correct");
//     flippedCards = [];

//     if (matchedCards.length === cardsData.length * 2) {
//       endGame(true);
//     }
//   } else {
//     playSound("sfx-wrong");
//     setTimeout(() => {
//       card1.classList.remove("flipped");
//       card2.classList.remove("flipped");
//       flippedCards = [];
//     }, 1000);
//   }
//   scoreEl.textContent = score;
// }

// function startTimer() {
//   timerEl.textContent = timeLeft;
//   timerInterval = setInterval(() => {
//     timeLeft--;
//     timerEl.textContent = timeLeft;
//     if (timeLeft <= 0) {
//       endGame(false);
//     }
//   }, 1000);
// }

// function endGame(win) {
//   clearInterval(timerInterval);
//   if (win) {
//     document.getElementById("finalScore").textContent = score;
//     openModal("winModal");
//     playSound("sfx-win");
//   } else {
//     openModal("loseModal");
//     playSound("sfx-lose");
//   }
// }

// function restartGame() {
//   clearInterval(timerInterval);
//   startGame();
// }

// function changeDifficulty() {
//   timeLeft = parseInt(this.value);
//   restartGame();
// }

// function openModal(id) {
//   document.getElementById(id).setAttribute("aria-hidden", "false");
// }

// function closeModal(id) {
//   document.getElementById(id).setAttribute("aria-hidden", "true");
// }

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// function playSound(id) {
//   const audio = document.getElementById(id);
//   if (audio) audio.play();
// }

// /* Ranking */
// function saveScore() {
//   const playerName = document.getElementById("playerName").value || "Anônimo";
//   let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
//   ranking.push({ name: playerName, score });
//   ranking.sort((a, b) => b.score - a.score);
//   if (ranking.length > 5) ranking = ranking.slice(0, 5);
//   localStorage.setItem("ranking", JSON.stringify(ranking));
//   updateRankingTable();
//   closeModal("winModal");
// }

// function updateRankingTable() {
//   const tbody = document.querySelector("#rankingTable tbody");
//   tbody.innerHTML = "";
//   const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
//   ranking.forEach((item, index) => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `<td>${index + 1}</td><td>${item.name}</td><td>${item.score}</td>`;
//     tbody.appendChild(tr);
//   });
// }

// function clearRanking() {
//   localStorage.removeItem("ranking");
//   updateRankingTable();
// }

// // Inicializar ranking ao abrir modal
// document.getElementById("showRankBtn").addEventListener("click", updateRankingTable);
