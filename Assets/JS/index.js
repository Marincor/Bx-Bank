const botao = document.querySelector("[data-formulario__botao]");

botao.addEventListener("click", botaoClique);

function botaoClique(evento) {
  evento.preventDefault();

  /* campos do formulario */

  const cpf = 31596028009;
  const inputCpf = document.querySelector("[data-formulario__input-cpf]");
  const valorCpf = inputCpf.value;

  const conta = 43;
  const inputConta = document.querySelector("[data-formulario__input-conta]");
  const valorConta = inputConta.value;

  /* coletor do local storage + regra */

  const cadastro = JSON.parse(window.localStorage.getItem("localCadastro")) || alert ("Nenhum dado foi encontrado no armazenamento local; clique em cadastre-se para criar um novo usuário");
 


  const buscaCpf = cadastro.find((atributo) => atributo._cpf == valorCpf);
  const buscaConta = cadastro.find((atributo) => atributo._conta == valorConta);

  
 

  if (buscaConta && buscaCpf) {
    alert("Bem-vindo ao Internet Banking da BX");

    window.location.href = "home.html";
  }
  else {
    document.querySelector("[data-formulario__input-cpf]").value = "";
    document.querySelector("[data-formulario__input-conta]").value = "";
    alert("os dados informados estão incorretos");
  }

  console.log(cadastro);

  /*------*/
}
