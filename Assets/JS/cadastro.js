class Cliente {
  constructor(nome, cpf, senha, email) {
    this._nome = nome;
    this._cpf = cpf;
    this._senha = senha;
    this.email = email;
    this._conta = Math.round(Math.random() * 100);
    this._saldo = 0;
  }

  set senha(senha) {
    return (this._senha = senha);
  }

  
  
  

  get saldo() {
    return this._saldo;
  }
  set saldo(saldo) {
    return (this._saldo = saldo);
  }
}


const botaoCadastro = document.querySelector("[data-botao-cadastro]");

const Tarefa = (evento) => {
  evento.preventDefault();

  
  const nomeDigitado = document.querySelector("[data-nome]").value || 'vazio';
  const cpfDigitado = document.querySelector("[data-cpf]").value || 'vazio';
  const senhaDigitada = document.querySelector("[data-senha]").value || 'vazio';
  const emailDigitado = document.querySelector ("[data-email]").value || 'vazio';

  if ( nomeDigitado == 'vazio' || cpfDigitado == 'vazio' || senhaDigitada == 'vazio' || emailDigitado == 'vazio') {

    alert ('Obrigatório preencher todos os campos para a criação de um novo usuário')
  } else {

    const x =  new Cliente(nomeDigitado, cpfDigitado, senhaDigitada, emailDigitado);

  let dados = JSON.parse(localStorage.getItem("localCadastro")) || [];
  dados.push(x);
  localStorage.setItem("localCadastro", JSON.stringify(dados));

  

  

  function storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  if (storageAvailable("localStorage")) {
    //nothing happens//
  } else {
    alert(
      "É necessário que o armazenamento local esteja disponivel para prosseguir"
    );
  }

  

  /* envio dos dados via e-mail */

  const userID = "user_9AVv2nUuEMkm1XKMrHQxX";
  const serviceID = "service_8item4j";
  const templateID = "template_0cnrtcl";

  (function () {
    emailjs.init(userID); //please encrypted user id for malicious attacks
  })();
  //set the parameter as per you template parameter[https://dashboard.emailjs.com/templates]
  var templateParams = {
    to_name: nomeDigitado,
    account: x._conta,
    password: senhaDigitada,
    to_email: emailDigitado,
  };

  emailjs.send(serviceID, templateID, templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );

  /*  -- - -*/

  document.querySelector("[data-nome]").value = '';
  document.querySelector("[data-cpf]").value = '';
  document.querySelector("[data-senha]").value = '';
  document.querySelector("[data-email]").value = '';

  alert ('verifique seu e-mail, sua conta e senha foram enviados para ele!')
  }

  /* cadastro feito, zerando campos */ 


 


  

};




botaoCadastro.addEventListener("click", Tarefa);
