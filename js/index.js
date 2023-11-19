window.onload = function mostrarBotones(){
  $(".botones").html(
    `<button onClick="window.location.href='./index.html';" class="navButton btn btn-lg" type="button">
      <span class="glyphicon glyphicon-home"></span> Sobre el juego
    </button>
    <button onClick="window.location.href='https://github.com/FerCardosMartegani/ProyectoMuralesInteractivos/tree/etapa1';" class="navButton btn-lg" type="button">
      <span class="glyphicon glyphicon-folder-open"></span> Repositorio
    </button>
    <button onClick="window.location.href='jugable.html';" class="navButton btn btn-lg" type="button">
      <span class="glyphicon glyphicon-play-circle"></span> ¡Jugar ahora!
    </button>
    <button onClick="window.location.href='escaner.html';" class="navButton btn btn-lg" type="button">
      <span class="glyphicon glyphicon-camera"></span> Escaner
    </button>
    <button onClick="window.location.href='generador.html';" class="navButton btn btn-lg" type="button">
      <span class="glyphicon glyphicon-qrcode"></span> Generador
    </button>
    <button onClick="window.location.href='lector.php';" class="navButton btn btn-lg" type="button">
      <span class="glyphicon glyphicon-th-list"></span> Registro
    </button>
    <button onClick="window.location.href='jugable.php';" class="navButton btn btn-lg" type="button">
      <span class="glyphicon glyphicon-book"></span> Guardar
    </button>
    <button class="navButton btn btn-lg" type="button" disabled="disabled">
      <span class="glyphicon glyphicon-alert"></span> Próximamente
    </button>
    <button onClick="window.location.href='https://youtu.be/dQw4w9WgXcQ';" class="navButton btn btn-lg" type="button">
      <span class="glyphicon glyphicon-expand"></span> Más información
    </button>
  `);
}
