<?php

if ($_SERVER['SERVER_NAME'] == 'localhost') {
    // Ambiente local
    // $servidor = "localhost:3080";
    $servidor = "localhost";
    $usuario = "root";
    $senha = ""; // SEM senha por padrão no XAMPP
    $banco = "senacmural";
    $porta = 3080;          // coloque 3080 se realmente alterou a porta do MySQL
    // $porta = 3306;          // coloque 3080 se realmente alterou a porta do MySQL
} else {
    // Produção
    $servidor = "sql202.infinityfree.com";
    $usuario = "if0_39545934";
    $senha = "q3V3WcFCvJr";
    $banco = "if0_39545934_senacmural";
    $porta = 3306; // coloque 3080 se realmente alterou a porta do MySQL
}

$conn = new mysqli($servidor, $usuario, $senha, $banco, $porta);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Proteção contra acesso direto
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    exit("Acesso negado.");
}
