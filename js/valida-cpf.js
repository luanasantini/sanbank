export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "");
    if(validaNumerosRepetidos(cpf) ||  validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        console.log("Esse cpf não existe, digite novamente!")
    } else {
        console.log("Esse cpf existe.");
    }
}



function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
        ]

        return numerosRepetidos.includes(cpf.toString());
}



function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if(soma == 10 || soma == 11){
        soma = 0
    }

    return soma!= cpf[9]
}

/*1) Recolher os 9 primeiros dígitos do CPF e multiplicar por números de 10 a 2. 2) Somar todos os valores gerados nas multiplicações entre eles. 3) Multiplicar essa soma por 10. 4) Dividir o resultado da soma por 11 (considerar módulo). OBS.: Se o resultado for 10 ou 11, considerar 0.*/

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if(soma == 10 || soma == 11){
        soma = 0
    }

    return soma!= cpf[10]
}

/*1) Recolher os 10 primeiros dígitos do CPF e multiplicar por números de 11 a 2. 2) Somar todos os valores gerados nas multiplicações entre eles. 3) Multiplicar essa soma por 10. 4) Dividir o resultado da soma por 11 (considerar módulo). OBS.: Se o resultado for 10 ou 11, considerar 0.*/