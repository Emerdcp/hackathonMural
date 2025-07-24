<?php
require_once '../config.php';
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

$categoria = $_POST['categoria'] ?? '';
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$titulo = $_POST['titulo'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$st_registro = $_POST['st_registro'] ?? '';


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = 'E-mail inválido.';
    echo json_encode($response);
    exit;
}

if (!$categoria || !$nome || !$email || !$telefone || !$titulo || !$descricao) {
    $response['message'] = 'Todos os campos obrigatórios devem ser preenchidos.';
    echo json_encode($response);
    exit;
}


try {
    $sql = "INSERT INTO CAD_MURAL (CATEGORIA, NOME, EMAIL, TELEFONE, TITULO, DESCRICAO, ST_REGISTRO) VALUES (?, ?, ?, ?, ?, ?, 'A')";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        $response['message'] = "Erro no prepare: " . $conn->error;
        echo json_encode($response);
        exit;
    }
    $stmt->bind_param("ssssss", $categoria, $nome, $email, $telefone, $titulo, $descricao);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Inserido no mural com sucesso!';
    } else {
        $response['message'] = 'Erro ao cadastrar: ' . $stmt->error;
    }

    $stmt->close();
    $conn->close();

    echo json_encode($response);
} catch (Exception $e) {
    //throw $th;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}


