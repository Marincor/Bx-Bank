//import { Cliente } from "./Cadastro.js";

/* inicio da sessão do internet banking */

var data = new Date();

// Guarda cada pedaço em uma variável
var dia = data.getDate(); // 1-31
var dia_sem = data.getDay(); // 0-6 (zero=domingo)
var mes = data.getMonth(); // 0-11 (zero=janeiro)
var ano2 = data.getYear(); // 2 dígitos
var ano4 = data.getFullYear(); // 4 dígitos
var hora = data.getHours(); // 0-23
var min = data.getMinutes(); // 0-59
var seg = data.getSeconds(); // 0-59
var mseg = data.getMilliseconds(); // 0-999
var tz = data.getTimezoneOffset(); // em minutos

// Formata a data e a hora (note o mês + 1)
var str_data = dia + "/" + (mes + 1) + "/" + ano4;
var str_hora = hora + ":" + min;
var dataHora = str_data + "-" + str_hora;

let session = sessionStorage.getItem("session");

if (session == dataHora) {
  console.log("sessão iniciada");
  /* coleta dos dados da session*/
  const ibNome = document.querySelector("[data-apresenta]");
  const ibDados = document.querySelector(`[data-ib__conta]`);
  const ibSaldo = document.querySelector("[data-ib__saldo]");

  const dadosdaConta =
    JSON.parse(window.sessionStorage.getItem("contaBancaria")) || [];
  const contalogadaSession = dadosdaConta._conta;
  const senhalogadaSession = dadosdaConta._senha;

  const cadastro =
    JSON.parse(window.localStorage.getItem("localCadastro")) || [];

  const contaLogadaconta = cadastro.find(
    (atributo) => atributo._conta == contalogadaSession
  );
  const contaLogadaSenha = cadastro.find(
    (atributo) => atributo._senha == senhalogadaSession
  );

  /*  - -dados iniciais ib -- - */

  function atualizaSaldo() {
    ibSaldo.innerHTML = `Saldo em conta: R$ ${contaLogadaconta._saldo} reais`;
  }

  if (contaLogadaconta && contaLogadaSenha) {
    atualizaSaldo();
    ibNome.innerHTML = `Olá, ${contaLogadaconta._nome}`;
    ibDados.innerHTML = `Dados bancários:<br/>
    ■ Banco: BX-Bank <br/>
    ■ Conta: ${contaLogadaconta._conta} <br/>
    ■ Email: ${contaLogadaconta._email}`;
  } else {
    console.log("erro");
  }

  /* Depositar*/

  const botaoDepositar = document.querySelector(`[data-botao-depositar]`);

  botaoDepositar.addEventListener("click", tarefaDepositar);

  function tarefaDepositar(evento) {
    evento.preventDefault();
    const inputDeposito = document.querySelector(`[data-real-Depositado]`);

    const valorDeposito = parseInt(inputDeposito.value);

    if (isNaN(valorDeposito) || valorDeposito <= 0) {
      alert("você não pode depositar um valor em branco ou negativo");
    } else {
      contaLogadaconta._saldo = contaLogadaconta._saldo + valorDeposito;
      localStorage.setItem("localCadastro", JSON.stringify(cadastro));

      atualizaSaldo();
      alert("Deposito realizado com sucesso!");

      document.querySelector(`[data-real-Depositado]`).value = "";
    }
  }
  /* Sacar*/

  const botaoSacar = document.querySelector(`[data-botao-saque]`);

  botaoSacar.addEventListener("click", tarefaSacar);

  function tarefaSacar(evento) {
    evento.preventDefault();
    const inputSaque = document.querySelector(`[data-real-saque]`);

    const valorSaque = parseInt(inputSaque.value);

    if (isNaN(valorSaque)) {
      alert("você não pode sacar um valor em branco");
    } else if (valorSaque <= 0) {
      alert("você não pode sacar um valor negativo");
    } else if (valorSaque > contaLogadaconta._saldo) {
      alert("você não pode sacar um valor maior que o seu saldo");
    } else {
      const digitaSenha = parseInt(
        prompt("Digite sua senha para confirmar a operação")
      );

      if (digitaSenha == contaLogadaconta._senha) {
        contaLogadaconta._saldo = contaLogadaconta._saldo - valorSaque;
        localStorage.setItem("localCadastro", JSON.stringify(cadastro));

        atualizaSaldo();

        alert("Saque realizado com sucesso!");

        document.querySelector(`[data-real-saque]`).value = "";
      } else {
        alert("Senha incorreta");
      }
    }
  }

  /* Transferir*/

  const botaoTransferir = document.querySelector(`[data-botao-transferir]`);

  botaoTransferir.addEventListener("click", tarefaTransferir);

  function tarefaTransferir(evento) {
    evento.preventDefault();

    const inputValorTransferir = document.querySelector(
      `[data-real-transferir]`
    );
    const valorTransferir = parseInt(inputValorTransferir.value);

    const inputContaTransferir = document.querySelector(
      `[data-conta-transferir]`
    );
    const contaTransferir = parseInt(inputContaTransferir.value);

    const buscaContaDigitada = cadastro.find(
      (atributo) => atributo._conta == contaTransferir
    );

    if (
      isNaN(valorTransferir) ||
      isNaN(contaTransferir) ||
      valorTransferir <= 0 ||
      contaTransferir <= 0
    ) {
      alert(
        "Necessário digitar um valor e conta válidos para prosseguir com a operação"
      );
    } else {
      const digitaSenhaTransferir = parseInt(
        prompt("Digite sua senha para confirmar a operação")
      );

      if (digitaSenhaTransferir == contaLogadaconta._senha) {
        if (buscaContaDigitada) {
          buscaContaDigitada._saldo =
            buscaContaDigitada._saldo + valorTransferir;
          contaLogadaconta._saldo = contaLogadaconta._saldo - valorTransferir;
          localStorage.setItem("localCadastro", JSON.stringify(cadastro));

          atualizaSaldo();
          alert("Transferência realizada com sucesso!");

          document.querySelector(`[data-real-transferir]`).value = "";
          document.querySelector(`[data-conta-transferir]`).value = "";
        } else {
          alert("Essa conta não existe");
        }
      } else {
        alert("Senha incorreta");
      }
    }
  }

  /*/ - telas desktop - */

  /* tela deposito */
  const telaDepositar = document.querySelector(`[data-tela-depositar]`);

  telaDepositar.addEventListener("click", tarefaTelaDepositar);

  function tarefaTelaDepositar() {
    window.scrollBy(1, 800000);
  }

  const mobileTelaDepositar = document.querySelector("[data-ib-depositar]");
  mobileTelaDepositar.addEventListener("click", tarefaMobileDepositar);

  function tarefaMobileDepositar() {
    window.scrollBy(1, 800000);
  }

  /* tela sacar */
  const telaSacar = document.querySelector(`[data-tela-sacar]`);

  telaSacar.addEventListener("click", tarefaTelaSacar);

  function tarefaTelaSacar() {
    //window.scrollBy(800, 1300);
    window.scrollBy(1, 800000);
  }

  const mobileTelaSacar = document.querySelector("[data-ib-sacar]");

  mobileTelaSacar.addEventListener("click", tarefaMobileSacar);

  function tarefaMobileSacar() {
    console.log("teste");
    window.scrollBy(1, 800000);
  }

  /* tela transferir */
  const telaTransferir = document.querySelector(`[data-tela-transferir]`);

  telaTransferir.addEventListener("click", tarefaTelaTransferir);

  function tarefaTelaTransferir() {
    window.scrollBy(1, 800000);
  }
  const mobileTelaTransferir = document.querySelector(`[data-ib-transferir]`);

  mobileTelaTransferir.addEventListener("click", tarefaMobileTransferir);

  function tarefaMobileTransferir() {
    window.scrollBy(1, 800000);
  }
} else {
  window.location.href = "https://bx-bank-lwelf56cl-marincor.vercel.app/index.html";
}
