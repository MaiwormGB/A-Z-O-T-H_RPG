<?php
// Configurações do banco de dados
$host = 'localhost';
$dbname = 'nome_do_banco'; // Substitua pelo nome do seu banco
$username = 'usuario';     // Substitua pelo usuário do banco
$password = 'senha';       // Substitua pela senha do banco

header('Content-Type: application/json');

try {
    // Conexão com o banco de dados
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar se os dados foram enviados
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nome = $_POST['nome'];
        $senha = $_POST['senha'];
        $bio = isset($_POST['bio']) ? $_POST['bio'] : '';
        
        // Processar upload de imagem
        $imagem = null;
        if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
            $imagemTmp = $_FILES['imagem']['tmp_name'];
            $imagem = file_get_contents($imagemTmp);
        }
        
        // Verificar se o usuário já existe
        $stmt = $conn->prepare("SELECT id_cadastro FROM cadastro WHERE nome = :nome");
        $stmt->bindParam(':nome', $nome);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => false,
                'message' => 'Nome de usuário já existe. Escolha outro.'
            ]);
            exit;
        }
        
        // Inserir novo usuário
        $stmt = $conn->prepare("INSERT INTO cadastro (nome, senha, bio, imagem, id_cargo) 
                               VALUES (:nome, :senha, :bio, :imagem, 1)");
        
        // Hash da senha (importante para segurança)
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
        
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':bio', $bio);
        $stmt->bindParam(':imagem', $imagem, PDO::PARAM_LOB);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Cadastro realizado com sucesso! Redirecionando para login...'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Erro ao cadastrar usuário. Tente novamente.'
            ]);
        }
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro no servidor: ' . $e->getMessage()
    ]);
}
?>