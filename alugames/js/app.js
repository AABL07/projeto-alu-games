/*Desafio 1 - No projeto Alugames, uma confirmação ao devolver um jogo, solicitando ao usuário que 
confirme a devolução antes que ela seja concluída. Isso pode ajudar a evitar devoluções acidentais.*/
/*Desafio 2 - No projeto Alugames, crie uma função para imprimir no console a informação sobre quantos jogos foram alugados.*/

let jogosAlugados = 0;

function contarEExibirJogosAlugados() {
    const contadorElemento = document.getElementById('contador-jogos');
    contadorElemento.textContent = `Jogos alugados: ${jogosAlugados}`;
}

function alterarStatus(id) {
    let gameClicado = document.getElementById(`game-${id}`);
    let imagem = gameClicado.querySelector('.dashboard__item__img');
    let botao = gameClicado.querySelector('.dashboard__item__button');
    let nomeJogo = gameClicado.querySelector('.dashboard__item__name');
    

    if (imagem.classList.contains('dashboard__item__img--rented')) {
        // Adiciona uma confirmação antes de devolver o jogo
        if (confirm(`Você tem certeza que deseja devolver o jogo ${nomeJogo.textContent}?`))
        imagem.classList.remove('dashboard__item__img--rented');
        botao.classList.remove('dashboard__item__button--return');
        botao.textContent = 'Alugar';
        // Verifica se jogosAlugados é maior que zero antes de decrementar
        if (jogosAlugados > 0) {
            jogosAlugados--;
        }
    } else {
        imagem.classList.add('dashboard__item__img--rented');
        botao.classList.add('dashboard__item__button--return');
        botao.textContent = 'Devolver';
        jogosAlugados++;
    } 
    
    
    contarEExibirJogosAlugados();

// Inicializa a contagem considerando que os jogos já começam disponíveis para alugar
document.addEventListener('DOMContentLoaded', function() {
    // Limpar localStorage (se necessário)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('jogo-')) { // Substitua 'jogo-' pelo prefixo correto das suas chaves
            localStorage.removeItem(key);
        }
    }

    // Limpar cookies (se necessário)
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const cookieName = cookie.split('=')[0];
        if (cookieName.startsWith('jogo-')) { // Substitua 'jogo-' pelo prefixo correto dos seus cookies
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    }

    // Remove a classe 'dashboard__item__img--rented' de todas as imagens
    document.querySelectorAll('.dashboard__item__img').forEach(img => {
        img.classList.remove('dashboard__item__img--rented');
    });

    // Atualiza o texto dos botões para "Alugar"
    document.querySelectorAll('.dashboard__item__button').forEach(botao => {
        botao.classList.remove('dashboard__item__button--return');
        botao.textContent = 'Alugar';
    });

    jogosAlugados = 0; // Garante que a contagem comece em zero
    contarEExibirJogosAlugados();
});
}
