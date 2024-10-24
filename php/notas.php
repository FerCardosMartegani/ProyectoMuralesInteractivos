<?php
require '../conector.php';

$muro = $_GET['muro'];

// Fetch existing notes
$sql = "SELECT * FROM `notitas` WHERE `muro` = ?";
$stmt = $conector->prepare($sql);
$stmt->bind_param("s", $muro);
$stmt->execute();
$result = $stmt->get_result();

$notitas = [];
while ($row = $result->fetch_assoc()) {
    $notitas[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" />

    <script src="../libraries/p5.min.js"></script>
    <script src="../libraries/p5.sound.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

    <link rel="stylesheet" href="../styles/notas.css" />
    <link rel="stylesheet" href="../styles/index.css" />
    <link rel="icon" href="../assets/img/icon.png" />
    <title>Proyecto Murales Interactivos</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Coming+Soon&family=Darumadrop+One&display=swap" rel="stylesheet">
</head>

<body>
    <div id="pagina">
        <div id="p5">
            <div id="canvas"> <!-- CANVAS P5 --> </div>
            <form method="post" action="guardarNota.php" id="falseForm">
                <input type="hidden" name="mensaje" id="falseInputNotita">
                <input type="hidden" name="muro" id="falseInputUUID" value="<?php echo $muro; ?>">
                <input type="hidden" name="posX" id="falseInputPosX">
                <input type="hidden" name="posY" id="falseInputPosY">
                <input type="hidden" name="color" id="falseInputColor">
            </form>
        </div>

        <div class="contenedorBotones">
            <button type="button" class="customButton" id="botonCrearMuro" onclick="location.assign('./crearMuro.php')" style="display: none;">
                <h4>¡Quiero crear mi muro!</h4>
            </button>
            <button type="button" class="customButton" id="botonDejarNota" onclick="dejarNota()">
                <h4>¡Dejar Nota!</h4>
            </button>

            <button type="button" class="customButton" id="botonVolver" onclick="location.assign('../index.php')">
                <h4>Volver al escáner</h4>
            </button>

            <button type="button" class="customButton" id="botonDescargarQR">
                <h4>Descargar mural</h4>
            </button>
        </div>
    </div>

    <!-- Contenedor temporal para el código QR -->
    <div id="qrContainer" style="display: none;"></div>

    <script>
        var existingNotes = <?php echo json_encode($notitas); ?>;

        // Generar QR y descargar al pulsar el botón
        document.getElementById('botonDescargarQR').addEventListener('click', function() {
    let urlMuro = "<?php echo $muro; ?>"; // URL del muro
    let qrElement = document.getElementById('qrContainer'); // Usar el contenedor oculto

    // Generar el QR en el contenedor
    qrElement.style.display = 'block'; // Hacer visible temporalmente
    new QRCode(qrElement, {
        text: urlMuro,
        width: 400, // Aumentar el tamaño
        height: 400 // Aumentar el tamaño
    });

    // Esperar un pequeño tiempo para asegurarse de que se renderiza antes de capturar
    setTimeout(() => {
        html2canvas(qrElement, { scale: 2 }).then(canvas => { // Aumentar la escala
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Establecer el fondo del PDF
            pdf.setFillColor(255, 243, 175);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F'); // Fondo rojo

            // Texto en el PDF
            pdf.setFontSize(24);
            pdf.text('Escanea este código QR para acceder a tu muro:', 10, 20);

            // Agregar la imagen del QR
            pdf.addImage(imgData, 'PNG', pageWidth / 2 - 100, pageHeight / 2 - 100, 200, 200); // Ajustar tamaño y posición

            // Descargar el archivo PDF
            pdf.save('QR_Code.pdf');

            // Limpiar el elemento temporal
            qrElement.innerHTML = ''; // Limpiar el contenedor
            qrElement.style.display = 'none'; // Ocultar nuevamente
        });
    }, 500); // Ajusta el tiempo de espera si es necesario
});

    </script>

    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js"></script>
    <script src="../scripts/sketch.js"></script>

</body>

</html>
