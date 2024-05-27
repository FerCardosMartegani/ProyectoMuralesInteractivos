<?php
//----------------------------------------------------------------------CONECTAR CON DATABASE
require './conector.php';

//----------------------------------------------------------------------CONSULTA PARA OBTENER LOS MENSAJES
$param = $_GET['muro'];
$sql = "SELECT * FROM notitas WHERE muro='$param'";
$result = $conector->query($sql);

// Si hay resultados, convertirlos a formato JSON
if ($result->num_rows > 0) {
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    // Devolver los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($rows);
} else {
    echo "No se encontraron datos.";
}
$conector->close();
