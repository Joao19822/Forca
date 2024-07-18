var listaPalavras = [
    { palavra: 'xbox', dica: 'Console' },
    { palavra: 'playstation', dica: 'Console' },
    { palavra: 'controle', dica: 'Tem botões' },
    { palavra: 'televisao', dica: 'Objeto usado para assistir' },
    { palavra: 'computador', dica: 'Máquina usada para diversas ocasiões' },
    { palavra: 'league of legends', dica: 'Jogo eletrônico popular' }
];



let palavraEscolhida;
let exibicaoPalavra;
let letraChutadas;
let tentativasRestantes;
let numeroErros;

function iniciarJogo() {
    document.getElementById('botao-reiniciar').style.display = 'none';
    document.getElementById('entrada-letra').disabled = false;

    var escolha = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    palavraEscolhida = escolha.palavra;
    var dica = escolha.dica;
    
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');
    letraChutadas = [];
    tentativasRestantes = 7;
    numeroErros = 0;

    document.getElementById('dica').innerText = `Dica: ${dica}`;
    atualizarExibicao();
}



function atualizarExibicao(){
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');

    document.getElementById("letras-usadas").innerText = `${letraChutadas.join(', ')}`;

    document.getElementById('mensagem').innerText = '';
    document.getElementById("imagem").src = `img/forca${numeroErros}.png`;

    if(tentativasRestantes ===0){
        encerrarJogo('Perdeu Bobão')
    }else if (!exibicaoPalavra.includes('_')){
        encerrarJogo('Parabens Você escapou da forca')
    }

}

function tentarAcertar() {
    var entradaLetra = document.getElementById('entrada-letra');
    var letra = entradaLetra.value.toLowerCase();

    if(!letra.match(/[a-zà-ùç]/i)){
        alert('coloca uma letra Valida ai 🤦‍♂️.');
        return;
    }

    if(letraChutadas.includes(letra)){
        alert('tu ja tentou essa letra cara');
        return;
    }

    letraChutadas.push(letra);  

    if(palavraEscolhida.includes(letra)){
        for (let i=0; i< palavraEscolhida.length; i++){
            if(palavraEscolhida[i] === letra){
                exibicaoPalavra[i] = letra;
            }
        }
    }else{
        tentativasRestantes--;
        numeroErros++;
    }
    
    entradaLetra.value = '';

    atualizarExibicao();

}



function encerrarJogo(mensagem) {
    document.getElementById('entrada-letra').disabled = true;

    document.getElementById('mensagem').style.display = 'block';
    document.getElementById('mensagem').innerText = mensagem;

    document.getElementById('botao-reiniciar').style.display = 'block';

}

window.load = iniciarJogo();

