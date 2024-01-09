<?php
//----------------------------------------------------------------------CONECTAR CON DATABASE
$server = "localhost";
$user = "root";
$pass = "";
$db = "proyectomurales";
$conector = new mysqli($server, $user, $pass, $db);

if ($conector->connect_errno) {
  die("F" . $conector->connect_error);
}

// Consulta para obtener los mensajes
$sql = "SELECT mensaje FROM mensajes";
$result = $conector->query($sql);

// Si hay resultados, convertirlos a formato JSON
if ($result->num_rows > 0) {
    $rows = array();
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    // Devolver los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($rows);
} else {
    echo "No se encontraron datos.";
}
$conector->close();
?>
