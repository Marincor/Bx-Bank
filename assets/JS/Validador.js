

export function botaoClique (evento) {
            
    evento.preventDefault ();

    
    const conta = 43;
    const inputConta = document.querySelector ('[data-formulario__input-conta]');
    const valorConta = inputConta.value;


    const cpf = 445;
    const inputCpf = document.querySelector('[data-formulario__input-cpf]');
    const valorCpf = inputCpf.value;
    
    if (cpf == valorCpf && conta == valorConta) {

        
    alert ('fui clicado');

    

    }else {

        alert ('os dados informados estão incorretos');
    }

}

 



  