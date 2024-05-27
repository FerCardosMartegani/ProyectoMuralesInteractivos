// -------------------------------------------------------------------------------------------------------DECLARACIÓN
let canvasDiv;
let nuevaNotita = [];

let muro;
let notitas = [];
let mensajesCargados;

// -------------------------------------------------------------------------------------------------------SETUP
function preload() {
  muro = sessionStorage.getItem("muro"); //recibir nombre del muro escaneado
  console.log("Viendo notitas del muro: " + muro);
}

function setup() {
  canvasDiv = document.querySelector("#canvas");
  let theCanvas = createCanvas(windowWidth / 2, windowHeight / 2);
  theCanvas.parent(canvasDiv); //anclar canvas al div

  mensajesCargados = false;

  loadJSON(
    "../php/mensajes.php?muro=" + muro,
    recibirJSON
  ); //cargar mensajes de la database
}

// -------------------------------------------------------------------------------------CARGAR MENSAJES DE LA DATABASE
function recibirJSON(mensajes) {
  console.log("Las notitas dicen: " + mensajes);
  for (let i = 0; i < mensajes.length; i++) {
    notitas[i] = mensajes[i].mensaje;
  }
  mensajesCargados = true;
}

// -------------------------------------------------------------------------------------------------------DRAW
function draw() {
  background(200);

  // -------------------------------------------------------------------------------------MOSTRAR NOTAS VIEJAS
  if (mensajesCargados) {
    text(notitas, 10, 10); //ejemplo para mostrar los mensajes cargados*********************************************
  }
}
