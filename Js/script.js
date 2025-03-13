// Função que preenche os campos com os dados do localStorage (se existirem)
window.onload = function() {
    const jogadorSalvo = localStorage.getItem('jogador');
    
    if (jogadorSalvo) {
        const jogador = JSON.parse(jogadorSalvo);

        // Preenche os campos do formulário principal
        document.getElementById('personagem').value = jogador.personagem || '';
        document.getElementById('nome').value = jogador.nome || '';
        document.getElementById('origem').value = jogador.origem || '';
        document.getElementById('pvT').value = jogador.pvT || '';
        document.getElementById('pvA').value = jogador.pvA || '';
        document.getElementById('sanT').value = jogador.sanT || '';
        document.getElementById('sanA').value = jogador.sanA || '';
        document.getElementById('peT').value = jogador.peT || '';
        document.getElementById('peA').value = jogador.peA || '';
        document.getElementById('forc').value = jogador.forc || '';
        document.getElementById('agi').value = jogador.agi || '';
        document.getElementById('int').value = jogador.int || '';
        document.getElementById('pre').value = jogador.pre || '';
        document.getElementById('vig').value = jogador.vig || '';
        document.getElementById('def').value = jogador.def || '';

        // Preenche os campos da defesa que estavam faltando
        document.getElementById('agiD').value = jogador.agiD || '';
        document.getElementById('vigD').value = jogador.vigD || '';
        document.getElementById('modD').value = jogador.modD || '';

        // Preenche os campos dentro das abas
        carregarAbas(jogador.abaData || {});
    }
};

// Evento de submit do formulário
document.getElementById('ficha').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Coleta os dados do formulário principal
    const jogador = {
        personagem: document.getElementById('personagem').value,
        nome: document.getElementById('nome').value,
        origem: document.getElementById('origem').value,
        pvT: document.getElementById('pvT').value,
        pvA: document.getElementById('pvA').value,
        sanT: document.getElementById('sanT').value,
        sanA: document.getElementById('sanA').value,
        peT: document.getElementById('peT').value,
        peA: document.getElementById('peA').value,
        forc: document.getElementById('forc').value,
        agi: document.getElementById('agi').value,
        int: document.getElementById('int').value,
        pre: document.getElementById('pre').value,
        vig: document.getElementById('vig').value,
        def: document.getElementById('def').value,

        // Salva os novos campos da defesa
        agiD: document.getElementById('agiD').value,
        vigD: document.getElementById('vigD').value,
        modD: document.getElementById('modD').value,

        abaData: salvarAbas() // Salva os dados das abas
    };

    // Armazena no localStorage
    localStorage.setItem('jogador', JSON.stringify(jogador));

    alert('||F I C H A | S A L V A||');
});

// Função para salvar os dados dentro das abas
function salvarAbas() {
    const abas = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
    let abaData = {};

    abas.forEach(tabId => {
        let dadosAba = {};
        const campos = document.querySelector(`#${tabId}`).querySelectorAll('input, select, textarea');

        campos.forEach(campo => {
            dadosAba[campo.id] = campo.value;
        });

        abaData[tabId] = dadosAba;
    });

    return abaData;
}

// Função para carregar os dados salvos das abas
function carregarAbas(abaData) {
    for (const tabId in abaData) {
        for (const campo in abaData[tabId]) {
            if (document.getElementById(campo)) {
                document.getElementById(campo).value = abaData[tabId][campo];
            }
        }
    }
}

// Função para alternar entre as abas
function openTab(tabId) {
    // Esconde todas as abas
    var contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => content.style.display = "none");

    // Exibe apenas a aba clicada
    document.getElementById(tabId).style.display = "block";
}

// Exibir a primeira aba por padrão ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    openTab('tab1');
});
