// Inicialize o EmailJS com sua chave pública
emailjs.init("fbhIuNlMOMTXb0ecr");

// Função de envio do formulário
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Use seu Service ID e Template ID
    emailjs.send("service_7x49c52", "template_9pmfh0h", params).then(
      function (response) {
        alert("Email enviado com sucesso!", response.status, response.text);
      },
      function (error) {
        alert("Falha ao enviar o email.", error);
      }
    );
  });
