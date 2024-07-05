//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo Advinha';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número de 1 a 10:';

let listaDeNumerosSorteados = [];
let limiteNumeros = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial() {
    exibirTexto('h1', 'Jogo advinha');
    exibirTexto('p', 'Escolha um número de 1 a 10:');
}

exibirMensagemInicial();

function verificarChute() { 
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto) {
        exibirTexto('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', `${mensagemTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTexto('p', 'O número secreto é menor!');
        } else {
            exibirTexto('p', 'O número secreto é maior!');
        }
        tentativas++
        limparCampo();
    }
}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumeros + 1);
    quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == limiteNumeros) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
