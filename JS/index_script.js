document.addEventListener('DOMContentLoaded', function() {
    const botoes = document.querySelectorAll('.botao-carrossel');
    const wrapper = document.querySelector('.botoes-wrapper');

    // Remove o destaque de todos os botões
    function removerDestaque() {
        botoes.forEach(botao => botao.classList.remove('ativo'));
    }

    // Adiciona destaque ao botão passado
    function adicionarDestaque(botao) {
        removerDestaque();
        botao.classList.add('ativo');
    }

    // Event listeners para hover
    botoes.forEach(botao => {
        botao.addEventListener('mouseenter', () => {
            adicionarDestaque(botao);

            // Scroll suave para centralizar o botão ativo
            const offsetTop = botao.offsetTop - (wrapper.offsetHeight / 2) + (botao.offsetHeight / 2);
            wrapper.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });

        botao.addEventListener('mouseleave', () => {
            botao.classList.remove('ativo');
        });

        botao.addEventListener('click', function(e) {
            e.preventDefault();

            // Só redireciona se o botão estiver ativo (hover)
            if (botao.classList.contains('ativo')) {
                const href = botao.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            }
        });
    });
});