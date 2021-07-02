

export function botaoClique (evento) {
            
    evento.preventDefault ();

    const cpf = 31596028009;
    const inputCpf = document.querySelector('[data-formulario__input-cpf]');
    const valorCpf = inputCpf.value;

    const conta = 43;
    const inputConta = document.querySelector ('[data-formulario__input-conta]');
    const valorConta = inputConta.value;




    
    if (cpf == valorCpf && conta == valorConta) {

        
    alert ('Bem-vindo ao Internet Banking da BX');

        window.location.href = ("home.html")

    }else {

        document.querySelector('[data-formulario__input-cpf]').value = ''
        document.querySelector ('[data-formulario__input-conta]').value = ''
        alert ('os dados informados estão incorretos');
    }

}

 



  