const botao = document.querySelector("[data-formulario__botao]");

botao.addEventListener("click", botaoClique);

export function botaoClique(evento) {
  evento.preventDefault();

  // Obtém a data/hora atual
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
  console.log(str_hora);

  // Mostra o resultado

  /* - ------------------- - */

  /* campos do formulario */

  const inputConta = document.querySelector("[data-formulario__input-conta]");
  const valorConta = inputConta.value;

  const inputSenha = document.querySelector("[data-formulario__input-senha]");
  const valorSenha = inputSenha.value;

  class dadosBancários {
    constructor(conta, senha) {
      this._conta = conta;
      this._senha = senha;
    }
  }

  /* coletor do local storage + regra */

  const cadastro =
    JSON.parse(window.localStorage.getItem("localCadastro")) ||
    alert(
      "Nenhum dado foi encontrado no armazenamento local; clique em cadastre-se para criar um novo usuário"
    );

  const buscaConta = cadastro.find((atributo) => atributo._conta == valorConta);
  const buscaSenha = cadastro.find((atributo) => atributo._senha == valorSenha);

  if (buscaConta && buscaSenha) {
    sessionStorage.setItem("session", dataHora);
    sessionStorage.setItem(
      "contaBancaria",
      JSON.stringify(new dadosBancários(valorConta, valorSenha))
    );
    alert("Bem-vindo ao Internet Banking da BX");
    window.location.href = "home.html";
  } else {
    document.querySelector("[data-formulario__input-conta]").value = "";
    document.querySelector("[data-formulario__input-senha]").value = "";
    alert("os dados informados estão incorretos");
  }

  /*------*/
}
