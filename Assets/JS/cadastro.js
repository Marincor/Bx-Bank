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

  get conta() {
    return this._conta;
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

  const nomeDigitado = document.querySelector("[data-nome]").value;
  const cpfDigitado = document.querySelector("[data-cpf]").value;
  const senhaDigitada = document.querySelector("[data-senha]").value;
  const emailDigitado = document.querySelector ("[data-email]").value;

  let dados = JSON.parse(localStorage.getItem("localCadastro")) || [];
  dados.push(new Cliente(nomeDigitado, cpfDigitado, senhaDigitada, emailDigitado));
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
};




botaoCadastro.addEventListener("click", Tarefa);
