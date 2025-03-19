const backgrounds = [
    'url("https://th.bing.com/th/id/OIP.vA5LHpsWN17cQEV94gJBngHaGG?w=228&h=187&c=7&r=0&o=5&pid=1.7")', // Imagem 1
    'url("https://th.bing.com/th/id/OIP.lf_XhbZbNbWBaBQWlwEEDgHaH3?rs=1&pid=ImgDetMain")', // Imagem 2
    'url("https://via.placeholder.com/1920x1080/FFD700/ffffff?text=Imagem+3")', // Imagem 3
    'url("https://via.placeholder.com/1920x1080/FF6347/ffffff?text=Imagem+4")',  // Imagem 4
    'url("https://th.bing.com/th/id/OIP.vA5LHpsWN17cQEV94gJBngHaGG?w=228&h=187&c=7&r=0&o=5&pid=1.7")'
];

const texts = [
    'Texto 1',
    'Texto 2',
    'Texto 3',
    'Texto 4',
    'Texto 5'
];

let currentIndex = 0; // Índice para controlar a posição no array

function updateContent() {
    // Atualiza o plano de fundo
    document.body.style.backgroundImage = backgrounds[currentIndex];
    
    // Atualiza o texto
    document.getElementById('text').innerText = texts[currentIndex];
}

document.getElementById('arrow-left').addEventListener('click', function() {
    // Decrementa o índice (circularmente)
    currentIndex = (currentIndex - 1 + backgrounds.length) % backgrounds.length;
    updateContent();
});

document.getElementById('arrow-right').addEventListener('click', function() {
    // Incrementa o índice (circularmente)
    currentIndex = (currentIndex + 1) % backgrounds.length;
    updateContent();
});

// Inicializa o conteúdo ao carregar a página
updateContent();