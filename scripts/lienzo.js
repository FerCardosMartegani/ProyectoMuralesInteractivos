// -------------------------------------------------------------------------------------------------------DECLARACIÓN
let mostrar = [];
let canvasDiv, mainDiv;
let estado;
let nuevoDibujo = [];
let nuevoDibujoJSON = [];

let textoDelQR;
let dibujosViejos = [];
let dibujosCargados;

const ESCANER = 0;
const CANVAS = 1;
const QRFINAL = 2;

// -------------------------------------------------------------------------------------------------------SETUP
function preload() {}

function setup() {
  let canvasSize = windowWidth * 0.85;
  canvasDiv = document.querySelector("#canvas");
  let theCanvas = createCanvas(canvasSize, canvasSize);
  theCanvas.parent(canvasDiv); //anclar canvas al div

  colorMode(HSB, 100, 100, 100, 100);
  rectMode(CENTER);
  angleMode(DEGREES);

  mostrar[ESCANER] = $("#escaner");
  mostrar[CANVAS] = $("#p5");
  mostrar[QRFINAL] = $("#finalQR");

  estado = ESCANER;
  dibujosCargados = false;

  // loadJSON("http://localhost/Etapa2/php/mensajes.php", recibirJSON); //cargar dibujos de la database
}

// -------------------------------------------------------------------------------------CARGAR DIBUJOS DE LA DATABASE
function recibirJSON(mensajes) {
  for (let i = 0; i < mensajes.length; i++) {
    dibujosViejos[i] = JSON.parse(mensajes[i].mensaje); //convertir mensaje json en objetos p5

    let mensaje = dibujosViejos[i]; //convertir objetos del mensaje en objetos de clase Mancha
    for (let j = 0; j < mensaje.length; j++) {
      mensaje[j] = new Mancha(mensaje[j]);
    }
    dibujosViejos[i] = mensaje;
  }
  dibujosCargados = true;
}

// -------------------------------------------------------------------------------------------------------DRAW
function draw() {
  // -------------------------------------------------------------------------------------MÁQUINA DE ESTADOS
  for (let i = 0; i < mostrar.length; i++) {
    if (estado == i) {
      mostrar[i].removeClass("hidden");
    } else {
      mostrar[i].addClass("hidden");
    }
  }

  if (estado == CANVAS) {
    // -------------------------------------------------------------------------------------DIBUJAR
    background(90);

    // ---------------------------------------------------------------------DIBUJOS VIEJOS
    if (dibujosCargados) {
      for (let i = 0; i < dibujosViejos.length; i++) {
        for (let j = 0; j < dibujosViejos[i].length; j++) {
          dibujosViejos[i][j].dibujar();
        }
      }
    }

    // ---------------------------------------------------------------------DIBUJO NUEVO
    if (mouseIsPressed) {
      let jsonjeto = {
        prePosX: pmouseX,
        prePosY: pmouseY,
        posX: mouseX,
        posY: mouseY,
        color: [100, 100, 100],
        tam: 10,
      };
      nuevoDibujo.push(new Mancha(jsonjeto)); //crear nueva mancha
    }

    for (let i = 0; i < nuevoDibujo.length; i++) {
      nuevoDibujo[i].dibujar();
    }
  }
}

// -------------------------------------------------------------------------------------------------------MOUSE
function mouseReleased() {
  // -------------------------------------------------------------------------------------GUARDAR NUEVO DIBUJO
  if (estado == CANVAS) {
    nuevoDibujoJSON = JSON.stringify(nuevoDibujo);
  }
}

// -------------------------------------------------------------------------------------------------------TECLADO
function keyPressed() {
  if (key == " ") {
    estado++;
    if (estado >= mostrar.length) {
      estado = 0;
    }
    console.log("estado: " + estado);
  }
}

// -------------------------------------------------------------------------------------------------------LAPIZ
class Mancha {
  // constructor(x1, y1, x2, y2, c, t) {
  //   this.posX = x2;
  //   this.posY = y2;
  //   this.prePosX = x1;
  //   this.prePosY = y1;

  //   this.color = c;
  //   this.tam = t;
  // }
  constructor(protoMancha) {
    this.posX = protoMancha.posX;
    this.posY = protoMancha.posY;
    this.prePosX = protoMancha.prePosX;
    this.prePosY = protoMancha.prePosY;

    this.color = protoMancha.color;
    this.tam = protoMancha.tam;
  }

  dibujar() {
    push();
    stroke(this.color[0], this.color[1], this.color[2]);
    strokeWeight(this.tam);
    line(this.prePosX, this.prePosY, this.posX, this.posY);
    pop();
  }
}
