<?php

include("../config.php");

// Cabeçalho para garantir que o retorno seja JSON
header('Content-Type: application/json');

// Consulta com alias minúsculos para facilitar no JS
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
ORDER BY ID DESC";

$result = $conn->query($sql);

$dados = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $dados[] = $row;
    }
}

echo json_encode($dados);

$conn->close();

?>

