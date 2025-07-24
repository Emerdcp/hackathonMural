<?php
include("../config.php"); // ou ../config.php dependendo da pasta

// Apagar todos os registros da tabela
$sql = "DELETE FROM CAD_MURAL";

if ($conn->query($sql) === TRUE) {
    echo "Registros apagados com sucesso em " . date("Y-m-d H:i:s");
} else {
    echo "Erro ao apagar registros: " . $conn->error;
}

$conn->close();
?>
