<?php
require_once 'config.php';

// Verifica se é dia 01 e hora igual ou maior que 01:00
$dataAtual = new DateTime("now", new DateTimeZone('America/Sao_Paulo'));
$dia = $dataAtual->format('d');
$hora = $dataAtual->format('H');

// Verifica se é dia 01 e hora >= 01
if ($dia == '01' && $hora >= 1) {
    // Atualiza os registros para inativos
    $sql = "UPDATE CAD_MURAL SET ST_REGISTRO = 'I' WHERE ST_REGISTRO = 'A'";
    $conn->query($sql);
}
