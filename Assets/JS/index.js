const botao = document.querySelector("[data-formulario__botao]");

botao.addEventListener("click", botaoClique);

function botaoClique(evento) {
  evento.preventDefault();

  /* campos do formulario */

  
  const inputConta = document.querySelector("[data-formulario__input-conta]");
  const valorConta = inputConta.value;

  
  const inputSenha = document.querySelector("[data-formulario__input-senha]");
  const valorSenha = inputSenha.value;

  /* coletor do local storage + regra */

  const cadastro = JSON.parse(window.localStorage.getItem("localCadastro")) || alert ("Nenhum dado foi encontrado no armazenamento local; clique em cadastre-se para criar um novo usuário");
 


 
  const buscaConta = cadastro.find((atributo) => atributo._conta == valorConta);
  const buscaSenha = cadastro.find((atributo) => atributo._senha == valorSenha);
    
    
 

  if (buscaConta && buscaSenha) {
    alert("Bem-vindo ao Internet Banking da BX");

    window.location.href = "home.html";
  }
  else {
    document.querySelector("[data-formulario__input-conta]").value = "";
    document.querySelector("[data-formulario__input-senha]").value = "";
    alert("os dados informados estão incorretos");
  }


  /*------*/
}
