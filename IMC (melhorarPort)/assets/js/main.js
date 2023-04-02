function setResultado(msg, isValid){
    const resultado = document.querySelector('.resultado');
    resultado.innerHTML = '';
    const p = criaP();

    p.innerHTML = msg;
    resultado.appendChild(p);                           //ADICIONA ESCRITA EM RESULTADO
}

function criaP (){
    const p = document.createElement('p');
    return p;
}

const form = document.querySelector('.form');

form.addEventListener('submit', function (evento) {
    evento.preventDefault();                                            //previne de enviar o formulário erradamente

    //evento.target diz que após o evento (no caso 'submit'), deve-se selecionar os dados
    const inputPeso = evento.target.querySelector('#peso');             //pega o Peso do HTML pela tag "name"
    const inputAltura = evento.target.querySelector('#altura');         //pega o Altura do HTML pela tag "name"

    const peso1 = Number(inputPeso.value);                              //pegando para variáveis
    const altura1 = Number(inputAltura.value);

    if (!peso1){
        setResultado('Peso Inválido.', false);
        return;
    }else if(!altura1){
        setResultado('Altura Inválida.', false);
        return;
    }

    let imc = peso1/(altura1**2);
    imc = imc.toFixed(2);
    console.log(imc);

    if (imc < 18.5) setResultado(`Resultado: Abaixo do peso  | Seu IMC é de ${imc}`, true);
    else if ( imc >= 18.5 && imc < 25 ) setResultado(`Peso normal | Seu IMC é de ${imc}`, true);
    else if (imc >= 25 && imc < 30) setResultado(`Sobrepeso | Seu IMC é de ${imc}`, true);
    else if (imc >= 30 && imc < 35) setResultado(`Obesidade Grau 1 | Seu IMC é de ${imc}`, true);
    else if (imc >= 35 && imc < 40) setResultado(`Obesidade Grau 2 | Seu IMC é de ${imc}`, true);
    else if (imc >= 40) setResultado(`Obesidade Grau 3 | Seu IMC é de ${imc}`, true);

});


