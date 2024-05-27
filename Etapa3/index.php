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

  <!-- PWA -->
  <!-- descomentar para la versión final ************************************************************************** -->
  <!-- <link rel="manifest" href="./manifest.json" />
  <script type="text/javascript">
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    }
  </script> -->

  <!-- estilo -->
  <link rel="stylesheet" href="./styles/index.css" />
  <link rel="icon" href="./assets/img/icon.png" />
  <title>Proyecto Murales Interactivos</title>
</head>

<body>
  <!-- -------------------------------------------------------------------------------------BODY -->
  <div id="pagina">
    <?php
    //----------------------------------------------------------------------CONECTAR CON DATABASE
    require 'php/conector.php';

    //----------------------------------------------------------------------OBTENER LISTA DE MUROS
    $sql = "SELECT `UUID` FROM `muros`";
    $result = mysqli_query($conector, $sql);

    if ($result->num_rows > 0) { // Si hay resultados, convertirlos a formato JSON
      $rows = array();
      while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
      }
      $JSONrows = json_encode($rows);
      echo ("<script> let muros = JSON.parse('$JSONrows'); </script>"); //guardar muros en javaScript
    } else {
      echo "No se encontraron datos.";
    }

    //----------------------------------------------------------------------RECIBIR LINK LEÍDO FUERA DE LA APP
    $param = 'null';
    if (!empty($_GET['muro'])) {
      $param = $_GET['muro'];
    }
    echo ("
        <script>
          let param = '$param';
        </script>
      ");
    ?>

    <div class="row">
      <div class="col-sm-6"> <!-- ******************************************************************* -->
        <div id="reader"> <!-- ESCÁNER DE QR --> </div>
        <a href="./php/crearMuro.php"> Crear Muro </a> <!-- ********************************************** -->
      </div>
    </div>
  </div>


  <!-- -------------------------------------------------------------------------------------VALIDAR QR -->
  <script>
    validarQR(param);

    function validarQR(QR) {
      for (let i = 0; i < muros.length; i++) {
        if (QR.includes(muros[i].UUID)) {
          sessionStorage.setItem('muro', muros[i].UUID); //guardar UUID del muro
          location.assign('./php/verMuro.php');
        } else {
          console.log('link inválido');
        }
      }
    }
  </script>

  <!-- -------------------------------------------------------------------------------------LIBRERÍA ESCÁNER -->
  <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
  <script>
    validarQR("hola");

    // ----------------------------------------------------------------------ESCANEO EXITOSO
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);

      if (decodedText.includes("http://localhost/Etapa3/?muro=")) { //***************************************** */
        validarQR(decodedText);
      }
    }

    // ----------------------------------------------------------------------ESCANEO FALLIDO
    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      // console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
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