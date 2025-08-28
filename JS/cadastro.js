        document.getElementById('formCadastro').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            
            // Enviar dados para o servidor
            fetch('cadastro.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const mensagem = document.getElementById('mensagem');
                mensagem.style.display = 'block';
                
                if (data.success) {
                    mensagem.innerHTML = data.message;
                    mensagem.className = 'mensagem sucesso';
                    
                    // Redirecionar após cadastro bem-sucedido
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    mensagem.innerHTML = data.message;
                    mensagem.className = 'mensagem erro';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                const mensagem = document.getElementById('mensagem');
                mensagem.style.display = 'block';
                mensagem.innerHTML = 'Erro de conexão. Tente novamente.';
                mensagem.className = 'mensagem erro';
            });
        });