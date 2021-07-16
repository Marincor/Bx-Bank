const botao = document.querySelector(`[data-botao]`);

botao.addEventListener("click", enviarEmail);

function enviarEmail(evento) {
  evento.preventDefault();
  const userID = "user_9AVv2nUuEMkm1XKMrHQxX";
  const serviceID = "service_8item4j";
  const templateID = "template_f581si4";

  const nome = document.querySelector(`[data-nome]`).value;
  const email = document.querySelector(`[data-email]`).value;
  const texto = document.querySelector(`[data-text-area]`).value;

  (function () {
    emailjs.init(userID); //please encrypted user id for malicious attacks
  })();
  //set the parameter as per you template parameter[https://dashboard.emailjs.com/templates]
  var templateParams = {
    to_name: "Loki",
    from_name: JSON.stringify(nome),
    message_html: JSON.stringify(texto),
    to_email: email,
  };

  emailjs.send(serviceID, templateID, templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}
