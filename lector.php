<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css"
    integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

  <!-- botones -->
  <script src="./js/index.js"></script>

  <!-- estilo -->
  <link rel="stylesheet" type="text/css" href="styles/index.css">
  <link rel="icon" href="./assets/img/fish-0.png" />
  <title>Shark's Dinner lector</title>
</head>

<body>
  <!-- -------------------------------------------------------------------------------------BARRA LATERAL -->
  <div id="fixed" class="container-fluid visible-lg-block">
    <div class="row">
      <div id="sidebar" class="col-lg-2">
        <div class="imagen">
          <img src="./assets/img/Title.png" alt="Logo del juego" class="img-responsive center-block">
        </div>
        <div class="botones"></div>
      </div>
    </div>
  </div>


  <div id="pagina" class="container-fluid">
    <div class="row">
      <div id="contenido" class="col-lg-10 col-lg-offset-2">

        <!-- -------------------------------------------------------------------------------------PORTADA -->
        <div id="portada" class="row">
          <div class="imagen col-sm-3 col-sm-offset-1">
            <img src="./assets/img/shark-0,0.png" alt="Tiburón" class="tiburon img-responsive center-block">
          </div>
          <div id="titulo" class="col-sm-4 text-center">
            <h1>Shark's Dinner</h1>
            <h3>Sitio oficial</h3>
          </div>
          <div class="imagen col-sm-3">
            <img src="./assets/img/fish-1.png" alt="Pez" class="pez img-responsive center-block">
          </div>
        </div>

        <!-- -------------------------------------------------------------------------------------BARRA DE NAVEGACIÓN -->
        <nav id="navbar" class="row hidden-lg">
          <div class="botones"></div>
        </nav>

        <div class="separador"></div>

        <!-- -------------------------------------------------------------------------------------TABLA -->
        <div id="tabla">
          <div>
            <h2>Tabla</h2>
          </div>
          <div id="php">
            <?php
            require 'php/conector.php'; //llamar al php que accede a la tabla
            
            $sql = "select * from `mensajes`";
            $result = mysqli_query($conector, $sql); //ubicar tabla en la database
            
            $emparray = array();
            while ($row = mysqli_fetch_assoc($result)) {
              $emparray[] = $row; //convertir la info de la tabla en un arreglo
            }
            $json = json_encode($emparray); //convertir el arreglo en un texto JSON           
            echo ("<h3>" . $json . "<h3>"); //insertar texto en el html
            ?>
          </div>
        </div>

        <!-- -------------------------------------------------------------------------------------FOOTER -->
        <div class="separador"></div>

        <footer id="footer" class="row">
          <div id="contacto" class="col-sm-6 col-xs-12">
            <h5> Gmail: fer.cardos.martegani@gmail.com </h5>
            <h5> Teléfono: +54 9 221 304-0461 </h5>
            <h5> Discord: parmind_88 </h5>
          </div>
          <div class="col-sm-6 col-xs-12">
            <h5>Esta página forma parte del Proyecto Murales Interactivos, una iniciativa de la cátedra de la materia de
              Tecnología Multimedial 1, en la carrera de Diseño Multimedial de la Facultad de Artes en la Universidad
              Nacional de La Plata.</h5>
          </div>
        </footer>
      </div>
    </div>
  </div>

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