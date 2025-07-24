<?php
// Protege contra acesso direto
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Método inválido."]);
    exit;
}

require_once("../config/conexao.php"); // inclui a conexão

// Obtém dados do formulário
$nome     = trim($_POST['nome'] ?? '');
$email    = trim($_POST['email'] ?? '');
$telefone = trim($_POST['telefone'] ?? '');
$senha    = $_POST['senha'] ?? '';
$st_registro = 'A'; // ativo por padrão

// Validação básica
if (empty($nome) || empty($email) || empty($telefone) || empty($senha)) {
    echo json_encode(["success" => false, "message" => "Todos os campos são obrigatórios."]);
    exit;
}

// Valida e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "E-mail inválido."]);
    exit;
}

// Verifica se o e-mail já está cadastrado
$stmtVerifica = $conn->prepare("SELECT ID FROM CAD_USUARIO WHERE EMAIL = ?");
$stmtVerifica->bind_param("s", $email);
$stmtVerifica->execute();
$stmtVerifica->store_result();

if ($stmtVerifica->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Este e-mail já está cadastrado."]);
    exit;
}
$stmtVerifica->close();

// Criptografa a senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Insere o usuário
$stmt = $conn->prepare("INSERT INTO CAD_USUARIO (NOME, EMAIL, TELEFONE, SENHA, ST_REGISTRO) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nome, $email, $telefone, $senhaHash, $st_registro);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $conn->error]);
}
$stmt->close();
$conn->close();
