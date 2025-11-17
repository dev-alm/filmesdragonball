document.addEventListener("DOMContentLoaded", () => {

    /* ELEMENTOS */
    const game = document.getElementById("game");
    const timerEl = document.getElementById("timer");
    const scoreEl = document.getElementById("score");

    const restartBtn = document.getElementById("restartBtn");
    const showRankBtn = document.getElementById("showRankBtn");

    const winModal = document.getElementById("winModal");
    const loseModal = document.getElementById("loseModal");
    const rankModal = document.getElementById("rankModal");

    const finalScoreEl = document.getElementById("finalScore");
    const saveScoreBtn = document.getElementById("saveScoreBtn");
    const playAgainBtn = document.getElementById("playAgainBtn");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const backMenuBtn = document.getElementById("backMenuBtn");
    const closeRankBtn = document.getElementById("closeRankBtn");
    const clearRankBtn = document.getElementById("clearRankBtn");

    const playerNameInput = document.getElementById("playerName");

    /* SONS */
    const sfxCorrect = document.getElementById("sfx-correct");
    const sfxWrong = document.getElementById("sfx-wrong");
    const sfxWin = document.getElementById("sfx-win");
    const sfxLose = document.getElementById("sfx-lose");

    /* IMAGENS */
    const cards = ["goku", "gohan", "vegeta", "trunks", "piccolo", "freeza"];

    function imgPath(name) {
        return `assets/game-memory-img/${name}.jpg`;
    }

    /* VARIÁVEIS DO JOGO */
    let firstCard = null;
    let lockBoard = false;
    let matched = 0;
    let score = 0;
    let timeLeft = 30;
    let timer;

    /* --------------------------
          INICIA JOGO
    ---------------------------*/
    function startGame() {

        clearInterval(timer);

        matched = 0;
        score = 0;
        firstCard = null;
        lockBoard = false;
        scoreEl.textContent = score;

        const difficulty = parseInt(document.getElementById("difficulty").value);
        timeLeft = difficulty;
        timerEl.textContent = timeLeft;

        generateBoard();

        timer = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            sfxLose.play();
            openLoseModal();
        }
    }

    /* --------------------------
          CRIA TABULEIRO
    ---------------------------*/
    function generateBoard() {
        game.innerHTML = "";

        const list = [...cards, ...cards];
        list.sort(() => Math.random() - 0.5);

        list.forEach(name => {

            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.name = name;

            card.innerHTML = `
                <div class="face front"></div>
                <div class="face back" style="background-image:url('${imgPath(name)}')"></div>
            `;

            card.addEventListener("click", flipCard);

            game.appendChild(card);
        });
    }

    /* --------------------------
          VIRAR CARTAS
    ---------------------------*/

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add("flip");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        lockBoard = true;

        checkMatch(this);
    }

    function checkMatch(secondCard) {
        const match = firstCard.dataset.name === secondCard.dataset.name;

        if (match) {
            sfxCorrect.play();
            disableCards(firstCard, secondCard);
        } else {
            sfxWrong.play();
            unflipCards(firstCard, secondCard);
        }
    }

    function disableCards(a, b) {
        a.classList.add("disabled");
        b.classList.add("disabled");

        matched++;
        score += 100;
        scoreEl.textContent = score;

        firstCard = null;
        lockBoard = false;

        if (matched === cards.length) {
            clearInterval(timer);
            sfxWin.play();
            openWinModal();
        }
    }

    function unflipCards(a, b) {
        setTimeout(() => {
            a.classList.remove("flip");
            b.classList.remove("flip");
            firstCard = null;
            lockBoard = false;
        }, 700);
    }

    /* --------------------------
            MODAIS
    ---------------------------*/

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
        rankModal.setAttribute("aria-hidden", "true");
    }

    /* --------------------------
            RANKING
    ---------------------------*/

    function saveScore() {
        const name = playerNameInput.value.trim();
        if (!name) return alert("Digite seu nome!");

        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

        ranking.push({ name, score });
        ranking.sort((a, b) => b.score - a.score);

        localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 5)));

        loadRanking();
        closeModals();
    }

    function loadRanking() {
        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
        const tbody = document.querySelector("#rankingTable tbody");
        tbody.innerHTML = "";

        ranking.forEach((item, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td>${item.score}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    /* --------------------------
            BOTÕES
    ---------------------------*/

    restartBtn.onclick = startGame;
    tryAgainBtn.onclick = startGame;
    playAgainBtn.onclick = startGame;

    backMenuBtn.onclick = () => closeModals();

    showRankBtn.onclick = () => {
        loadRanking();
        rankModal.setAttribute("aria-hidden", "false");
    };

    closeRankBtn.onclick = () => rankModal.setAttribute("aria-hidden", "true");

    clearRankBtn.onclick = () => {
        localStorage.removeItem("ranking");
        loadRanking();
    };

    saveScoreBtn.onclick = saveScore;

    /* Start */
    startGame();
});
