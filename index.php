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
  <script src="libraries/p5.min.js"></script>
  <script src="libraries/p5.sound.min.js"></script>
  <script src="scripts/lienzo.js"></script>

  <!-- PWA -->
  <link rel="manifest" href="./manifest.json" />
  <script type="text/javascript">
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    }
  </script>

  <!-- estilo -->
  <link rel="stylesheet" href="./styles/index.css" />
  <link rel="icon" href="./assets/img/icon.png" />
  <title>Proyecto Murales Interactivos</title>
</head>

<body>
  <!-- -------------------------------------------------------------------------------------BODY -->
  <div id="pagina" class="container-fluid text-center">
    <div>
      <h1>Proyecto Murales Interactivos</h1>
    </div>

    <div id="main">
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
      ?>

      <!-- ----------------------------------------------------------------------ESCANER -->
      <div id="escaner" class="estado">
        <div id="reader" width="auto"></div>
        <div id="qrcode" class="center-block"></div>
      </div>

      <!-- ----------------------------------------------------------------------P5 -->
      <div id="p5" class="estado">
        <div id="canvas"> <!-- canvas --> </div>

        <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" id="falseForm">
          <input type="text" name="falseInput" id="falseInput" class="hide">
          <button type="submit" class="btn btn-success btn-lg center-block">Guardar</button>
        </form>

        <?php
        //----------------------------------------------------------------------GUARDAR NUEVO DIBUJO EN DATABASE
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
          $nuevoDibujo = $_POST['falseInput'];
          if (empty($nuevoDibujo)) {
            echo "<script> console.log('No hay dibujo'); </script>";
          } else {
            echo "<script> console.log('Nuevo dibujo: ($nuevoDibujo)'); </script>";

            // $sql = "INSERT INTO mensajes VALUES ('$name', '$name')"; //crea nueva fila
            $sql = "UPDATE mensajes SET mensaje='$nuevoDibujo' WHERE id='1'"; //cambia valores de la fila where
            $stmt = $conector->prepare($sql);
            $stmt->execute();
          }
        }
        ?>
      </div>
    </div>
  </div>

  <!-- -------------------------------------------------------------------------------------LIBRERÍA ESCANER -->
  <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
  <script>
    // ----------------------------------------------------------------------CUANDO ESCANEA UN CÓDIGO
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      // console.log(`Code matched = ${decodedText}`, decodedResult);

      if (estado == 0) {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        textoDelQR = decodedText;
        if (textoDelQR == "http://localhost/Etapa2/php/mensajes.php") {
          loadJSON(textoDelQR, recibirJSON); //cargar dibujos de la database
          estado = 1;
        }
      }
    }

    // ----------------------------------------------------------------------CUANDO NO ESCANEA NADA
    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      // console.warn(`Code scan error = ${error}`);
    }

    // ----------------------------------------------------------------------VENTANA
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  </script>

  <!-- -------------------------------------------------------------------------------------LIBRERÍA GENERADOR -->
  <script src="./libraries/davidshimjs-qrcodejs-04f46c6/jquery.min.js" type="text/javascript"></script>
  <script src="./libraries/davidshimjs-qrcodejs-04f46c6/qrcode.js" type="text/javascript"></script>
  <script>
    // ----------------------------------------------------------------------INSERTAR NUEVA URL
    new QRCode(
      document.getElementById("qrcode"),
      "http://localhost/Etapa2/php/mensajes.php"
    );
  </script>

  <!-- -------------------------------------------------------------------------------------GUARDAR NUEVO DIBUJO -->
  <script>
    var form = document.getElementById("falseForm");
    form.addEventListener('submit', handleForm);
    function handleForm(event) {
      // event.preventDefault();
      let agregar = nuevoDibujoJSON;
      console.log("nuevo dibujo: " + agregar);
      document.getElementById("falseInput").value = agregar;
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