//--------------------------------------------------------------------------------------------------------DECLARACIÓN
let funcionaElQR;

//--------------------------------------------------------------------------------------CONTROL
let pantalla, puntos,record, tiempo,segundos,minutos, debug, pausa;
const puntosParaGanar = 10;     //puntos necesarios para ganar
const puntosMenos = 5;      //puntos que quita el venenoso

//--------------------------------------------------------------------------------------RESPONSIVE
const canvasDiv = document.querySelector("#canvas");
let anchoDiv, anchoDivOg;

//--------------------------------------------------------------------------------------IMÁGENES
let imgFondo, logoJuego, logoScratch;
let imgShark = new Array(3);
let imgFish = new Array(2);

//--------------------------------------------------------------------------------------OBJETOS
let tibu;
let peces = new Array(4);   //cantidad inicial de peces (en total)
let carteles = [];
let botones = [];
let burbujasFondo;

//--------------------------------------------------------------------------------------NOMBRES
const W = 87;         //keyCode de teclas importantes
const S = 83;
const F = 70;
const R = 82;
const D = 68;

const IZQUIERDA = 0;      //posición del arreglo con la imagen de cada lado
const DERECHA = 1;

const NORMAL = 0;       //estados del tiburón
const MORDER = 1;
const ENFERMO = 2;

const VENENOSO = 1;     //tipos de peces
const BONUS = 2;

const MENU = 0;         //números de pantallas (y sus respectivos botones)
const JUEGO = 1;
const CREDITOS = 2;
const CONTROLES = 3;
const GANAR = 4;
const PERDER = 5;

const PUNTAJE = 0;      //números de carteles
const RELOJ = 1;
const PAUSA = 2;


//--------------------------------------------------------------------------------------------------------PRELOAD
function preload(){
  imgFondo = loadImage("../assets/img/underwater.png");
  logoJuego = loadImage("../assets/img/Title.png");
  logoScratch = loadImage("../assets/img/logo-scratch.png");

  for(let i=0; i<imgShark.length; i++){
    imgShark[i] = new Array(2);
    for(let j=0; j<imgShark[i].length; j++){
      imgShark[i][j] = loadImage("../assets/img/shark-"+i+","+j+".png");
    }
  }
  for(let i=0; i<2; i++){
    imgFish[i] = loadImage("../assets/img/fish-"+i+".png");
  }
}


//--------------------------------------------------------------------------------------------------------SETUP
function setup() {
  let theCanvas = createCanvas(0,0);
  theCanvas.parent(canvasDiv);                  //anclar canvas al div
  ajustarCanvas();

  colorMode(HSB, 360,100,100,100);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);

  tibu = new Shark();

  for(let i=0; i<peces.length-1; i++){
    peces[i] = new Fish(NORMAL);
  }
  peces[peces.length-1] = new Fish(VENENOSO);

  //(String, posX, posY, textSize, [pantalla])
  botones[JUEGO] = new Carteles("JUGAR", width*2/4,height*4/5, 40, JUEGO);
  botones[CREDITOS] = new Carteles("CRÉDITOS", width*1/4,height*3/5, 25, CREDITOS);
  botones[CONTROLES] = new Carteles("CONTROLES", width*3/4,height*3/5, 25, CONTROLES);

  carteles[PUNTAJE] = new Carteles(" 0 ", width*9/10,height*1/10, 25);
  carteles[RELOJ] = new Carteles("00:00", width*1/10,height*1/10, 25)
  carteles[PAUSA] = new Carteles("Pausa  || ", width/2,height*1/4, 40);
  carteles[GANAR] = new Carteles("Ganaste :D", width/2,height*1/4, 40);
  carteles[PERDER] = new Carteles("Perdiste :c", width/2,height*1/4, 40);

  //(posX, posY, area, cant, loop?)
  burbujasFondo = new Burbujas(width/2,height*1.5, height*2, 10, true);

  pantalla = 0;
  reset();
}


//--------------------------------------------------------------------------------------------------------DRAW
function draw() {
  background(0);
  image(imgFondo, width/2,height/2, width,nuevoAlto(imgFondo,width));

  if(funcionaElQR === true){
    fill(0,100,100,75);
    rect(width/2,height/2, width/2,height/2);
  }

  //--------------------------------------------------------------------------------------MENÚ PRINCIPAL
  if(pantalla == MENU){
    let nuevoAncho = width*2/7;
    image(logoJuego, width/2,height*1/4, nuevoAncho,nuevoAlto(imgFondo,nuevoAncho));
    burbujasFondo.burbujear();

    mostrarBotones();
  }
  //--------------------------------------------------------------------------------------JUEGO
  else if(pantalla == JUEGO){
    if(!pausa){ burbujasFondo.mover(); }
    burbujasFondo.dibujar();
    botones[JUEGO].burbujear();

    //-------------------------------------------------------------------TIBURÓN
    if(!pausa){
      tibu.mover();
      tibu.controles();
    }
    tibu.dibujar();

    //-------------------------------------------------------------------PECES
    for(let i=0; i<peces.length; i++){
      if(!pausa){ peces[i].mover(); }
      peces[i].dibujar();
    }
    if((segundos%10 == 0) && (segundos > 0) && (tiempo == 0)){
      peces.push(new Fish(VENENOSO));
    }

    //-------------------------------------------------------------------COLISIÓN
    if(!pausa){
      for(let i=0; i<peces.length; i++){
        let colision = (dist(tibu.bocaX,tibu.bocaY, peces[i].posX,peces[i].posY) < tibu.bocaR);
        let mordiendo = (tibu.estado == MORDER);
        let pezVivo = (peces[i].comido == false);
        if(colision && mordiendo && pezVivo){
          peces[i].comer();
          if(peces[i].tipo == VENENOSO){
            tibu.enfermar();
            puntos -= puntosMenos;
          }
          else{
            puntos++;
          }
        }
      }
    } 

    //-------------------------------------------------------------------CARTELES
    carteles[PUNTAJE].actualizar(" "+puntos+" ");
    carteles[PUNTAJE].dibujar();

    if(!pausa){ tiempo++; }
    if(tiempo >= frameRate()){ tiempo=0; segundos++; }
    if(segundos >= 60){ segundos=0; minutos++; }
    carteles[RELOJ].actualizar(nf(minutos,2)+":"+nf(segundos,2));
    carteles[RELOJ].dibujar();

    //-------------------------------------------------------------------GANAR Y PERDER
    if(puntos > record){ record = puntos; }

    if(puntos >= puntosParaGanar){
      carteles[PUNTAJE].actualizar(" "+record+" ");
      pantalla = GANAR;
    }
    if(puntos < 0){
      carteles[PUNTAJE].actualizar(" "+record+" ");
      pantalla = PERDER;
    }

    //-------------------------------------------------------------------PAUSA
    if(pausa){
      carteles[PAUSA].dibujar();
      mostrarBotones();
    }
  }
  //--------------------------------------------------------------------------------------GANAR
  else if(pantalla == GANAR){
    carteles[GANAR].dibujar();
    carteles[PUNTAJE].dibujar();
    carteles[RELOJ].dibujar();
    mostrarBotones();
    reset();
  }
  //--------------------------------------------------------------------------------------PERDER
  else if(pantalla == PERDER){
    carteles[PERDER].dibujar();
    carteles[PUNTAJE].dibujar();
    carteles[RELOJ].dibujar();
    mostrarBotones();
    reset();
  }
  //--------------------------------------------------------------------------------------CONTROLES
  else if(pantalla == CONTROLES){
    //...
    mostrarBotones();
  }
  //--------------------------------------------------------------------------------------CRÉDITOS
  else if(pantalla == CREDITOS){
    //...
    mostrarBotones();
  }
}

//--------------------------------------------------------------------------------------RESET
function reset(){
  puntos=tiempo=segundos=minutos=record=0;
  debug=pausa=false;

  tibu.reset();
  peces.length = 4;
  for(let i=0; i<peces.length; i++){
    peces[i].reset();
  }
}

function signoRandom(){
  return random([-1,+1]);
}

function mostrarBotones(){
  for(let i=1; i<botones.length; i++){
    if(i != pantalla){ botones[i].dibujar(); }
    else{ botones[i].burbujear(); }
  }
}


//--------------------------------------------------------------------------------------------------------INPUT
function keyPressed(){
  if(keyIsDown(D)){ debug = !debug; }
  if(debug){ print(keyCode); }
}
function keyReleased(){
  if((keyCode == R) && (pantalla == JUEGO)){ pausa = !pausa; }
}

function mouseClicked(){
  for(let i=1; i<botones.length; i++){
    botones[i].clic();
  }
}


//--------------------------------------------------------------------------------------------------------RESPONSIVE
function windowResized(){
  ajustarCanvas();
}
function ajustarCanvas(){
  anchoDiv = canvasDiv.offsetWidth;
  resizeCanvas(anchoDiv, anchoDiv*(9/16));    //ajustar canvas al ancho del div
}

function nuevoAlto(img, tam){
  return tam*(img.height/img.width);    //escalar altura de la imagen
}
