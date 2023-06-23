import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll("[required]")
const formulario = document.querySelector("[data-formulario]")

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //o evento padrão do submit é fazer reload, precisamos evitar isso

    const listaRespostas = { //evento.target.elements["nome"].value é usado para obter o valor do campo com o nome "nome" dentro do formulário. Da mesma forma, os outros campos são acessados usando evento.target.elements seguido pelo nome do campo desejado.
        "nome": evento.target.elements["nome"].value,
        "email": evento.target.elements["email"].value,
        "rg": evento.target.elements["rg"].value,
        "cpf": evento.target.elements["cpf"].value,
        "aniversario": evento.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); //o primeiro parametro é a chave, o "nome" do item, e o segundo parametro é o item que está sendo enviado. o JSON.stringify é para converter o objeto em JSON pra conseguir deixar salvo.

    window.location.href = './abrir-conta-form-2.html'; //fazer o redirecionamento pra próxima pagina

})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())

})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "Por favor, preencha um RG válido."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "Por favor, preencha um CPF válido."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = ""
    campo.setCustomValidity('')

    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) { //pra cada erro do array, ve se ele é true dentro da lista de erros do campo
            mensagem = mensagens[campo.name][erro]; //dentro da variavel mensagem, vai vir a mensagem que está dentro daquele nome, dentro daquele erro, na lista de mensagems
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro'); //seleciona o span mensagem-erro dentro do elemento pai do campo (no caso, o input)
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = ""
    }
}


