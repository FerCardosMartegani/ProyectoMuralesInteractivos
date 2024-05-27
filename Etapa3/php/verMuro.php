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

  <!-- p5 -->
  <script src="../libraries/p5.min.js"></script>
  <script src="../libraries/p5.sound.min.js"></script>

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

    <!-- ----------------------------------------------------------------------P5 -->
    <div id="p5">
      <div id="canvas"> <!-- canvas --> </div>

      <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" id="falseForm">
        <button type="submit" class="btn btn-success btn-lg">Guardar</button>
        <input type="text" name="falseInputNotita" id="falseInputNotita">
        <input type="text" name="falseInputUUID" id="falseInputUUID" class="hide">
        <input type="text" name="falseInputPosX" id="falseInputPosX" class="hide">
        <input type="text" name="falseInputPosY" id="falseInputPosY" class="hide">
        <input type="text" name="falseInputColor" id="falseInputColor" class="hide">
      </form>

      <?php
      //----------------------------------------------------------------------GUARDAR NUEVA NOTITA EN DATABASE
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $mensaje = $_POST['falseInputNotita'];
        $muro = $_POST['falseInputUUID'];
        $posX = $_POST['falseInputPosX'];
        $posY = $_POST['falseInputPosY'];
        $color = $_POST['falseInputColor'];
        if (!empty($mensaje) && !empty($muro)) {
          echo "<script> console.log('Nuevo mensaje: ($mensaje) en el muro ($muro)'); </script>";

          // $sql = "INSERT INTO $tabla(`mensaje`) VALUES ('$nuevaNotita')"; //crea nueva fila
          $sql = "INSERT INTO `notitas`(`muro`, `mensaje`, `posX`, `posY`, `color`) VALUES ('$muro','$mensaje','$posX','$posY','$color')";
          $stmt = $conector->prepare($sql);
          $stmt->execute();
        } else {
          echo "<script> console.log('No hay notita'); </script>";
        }
      }
      ?>

      <a href="../index.php">
        ← Volver
      </a>
    </div>
  </div>

  <!-- -------------------------------------------------------------------------------------GUARDAR DATOS DEL P5 -->
  <script src="../scripts/sketch.js"></script>
  <script>
    var form = document.getElementById("falseForm");
    form.addEventListener('submit', handleForm);
    function handleForm(event) {
      // event.preventDefault();
      console.log("guardado en " + muro);
      document.getElementById("falseInputUUID").value = muro;
      // document.getElementById("falseInputPosX").value = posX; //******************************************** */
      // document.getElementById("falseInputPosY").value = posY;
      // document.getElementById("falseInputColor").value = color;
    }
  </script>

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