<?php

//-------------------------------------------------------------------------------------CREAR CONECCIÓN CON LA DATABASE
$server = "localhost";
$user = "root";
$pass = "";
$db = "sharksdinner";
$conector = new mysqli($server, $user, $pass, $db);

if ($conector->connect_errno) {
  die("F" . $conector->connect_error);
}

//-------------------------------------------------------------------------------------CERRAR CONECCIÓN
// mysqli_close($conector);

?>
