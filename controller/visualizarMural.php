<?php

include("../config.php");

header('Content-Type: application/json');

$id = $_GET['id'] ?? null;

if (!$id || !is_numeric($id)) {
    echo json_encode(['erro' => 'ID inválido']);
    exit;
}

$sql = "SELECT 
    ID AS id, 
    CATEGORIA AS categoria, 
    NOME AS nome, 
    EMAIL AS email, 
    TELEFONE AS telefone, 
    TITULO AS titulo, 
    DESCRICAO AS descricao 
FROM CAD_MURAL 
WHERE ST_REGISTRO = 'A'
AND ID = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['erro' => 'Erro ao preparar a consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(['erro' => 'Anúncio não encontrado']);
}

$stmt->close();
$conn->close();

?>