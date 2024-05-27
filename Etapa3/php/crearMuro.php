<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
    integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous" />

  <!-- LIBRERÍA GENERADOR -->
  <script src="../libraries/davidshimjs-qrcodejs-04f46c6/jquery.min.js" type="text/javascript"></script>
  <script src="../libraries/davidshimjs-qrcodejs-04f46c6/qrcode.js" type="text/javascript"></script>

  <!-- estilo -->
  <link rel="stylesheet" href="../styles/index.css" />
  <link rel="icon" href="../assets/img/icon.png" />
  <title>Proyecto Murales Interactivos</title>
</head>

<body>
  <!-- -------------------------------------------------------------------------------------BODY -->
  <div id="pagina">
    <?php
    //----------------------------------------------------------------------CONECTAR CON DATABASE
    require './conector.php';
    ?>

    <div>
      <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" id="crearMuro">
        <button type="submit" class="btn btn-success btn-lg">Crear muro</button>
        <input type="text" class="hide" name="falseInput" id="falseInput">
      </form>

      <div id="generador">
        <div>
          <h2>GENERADOR</h2>
        </div>
        <div id="qrcode"></div>
      </div>

      <?php
      //----------------------------------------------------------------------GUARDAR NUEVA NOTITA EN DATABASE
      if ($_SERVER["REQUEST_METHOD"] == "POST") {

        //---------------------------------------------------------GENERAR NUEVA FILA EN 'MUROS'
        $UUID = uniqid("notitas");
        echo "<script> console.log('$UUID') </script>";
        $nuevoMuro = "http://localhost/Etapa3/?muro=" . $UUID;  //************************************************** */

        $sql = "INSERT INTO `muros`(`UUID`) VALUES ('$UUID')";
        $stmt = $conector->prepare($sql);
        $stmt->execute();
      
        //---------------------------------------------------------GENERAR QR
        echo ("
          <script> 
            let nuevoMuro = '$nuevoMuro';
            console.log(nuevoMuro);
            new QRCode(document.getElementById('qrcode'), nuevoMuro);
          </script>
          <a href='$nuevoMuro'>
            → Dejar una nota
          </a>
        ");
      }
      ?>

      <a href="../index.php">
        ← Volver
      </a>
    </div>
  </div>

  <!-- -------------------------------------------------------------------------------------BOOTSTRAP -->
  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"
    integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ"
    crossorigin="anonymous"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js"
    integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
    crossorigin="anonymous"></script>
</body>

</html>