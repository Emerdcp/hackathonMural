<?php

include("../config.php");

header('Content-Type: application/json');

$categoria = $_GET['filtroCategoria'] ?? '';
$titulo = $_GET['filtroTitulo'] ?? '';

// Monta a base do SQL
$sql = "SELECT 
    ID AS id, 
    CATEGORIA AS categoria, 
    TITULO AS titulo, 
    NOME AS nome, 
    EMAIL AS email, 
    TELEFONE AS telefone, 
    DESCRICAO AS descricao 
FROM CAD_MURAL 
WHERE ST_REGISTRO = 'A'
AND 1=1";
$params = [];
$types = "";

// Aplica filtro por categoria se informado
if (!empty($categoria)) {
    $sql .= " AND CATEGORIA = ?";
    $params[] = $categoria;
    $types .= "s";
}

// Aplica filtro por título (busca parcial)
if (!empty($titulo)) {
    $sql .= " AND TITULO LIKE ?";
    $params[] = "%" . $titulo . "%";
    $types .= "s";
}

$sql .= " ORDER BY ID DESC";

$stmt = $conn->prepare($sql);

if ($params) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$dados = [];
while ($row = $result->fetch_assoc()) {
    $dados[] = $row;
}

echo json_encode($dados);

$stmt->close();
$conn->close();
?>
