//--------------------------------------------------------------------------------------------------------CLASE CARTELES Y BOTONES
class Carteles {

  //--------------------------------------------------------------------------------------CONSTRUCTOR
  constructor(txt, x,y, t, l){    //String, posX, posY, textSize, [pantalla]
    this.posX = x;
    this.posY = y;

    this.texto;
    this.tam = t;
    this.tamX;
    this.tamY = this.tam*1.75;        //altura del cartel
    this.actualizar(txt);

    this.clicked = false;
    this.link = l;
    this.boton = (this.link != undefined);

    this.burbujas = new Burbujas(0,0,0,0, false);
  }

  //--------------------------------------------------------------------------------------CALCULADORA
  actualizar(txt){
    this.texto = txt;
    this.tamX = this.texto.length*this.tam;    //tamaño del cartel, basado en la cantidad de caracteres
  }

  clic(){ this.clicked = true; }
  hover(){
    let bordesX = (mouseX > this.posX-this.tamX/2) && (mouseX < this.posX+this.tamX/2);
    let bordesY = (mouseY > this.posY-this.tamY/2) && (mouseY < this.posY+this.tamY/2);
    if(bordesX && bordesY){
      let margen = 1.25;
      fill(230, 100, 100, 25);
      rect(this.posX,this.posY, this.tamX*margen,this.tamY*margen, this.tamY*margen);

      if(this.clicked){
        pantalla = this.link;
        this.burbujas = new Burbujas(this.posX,this.posY+this.tamY/3, this.tamY*2, 10, false);
      }
    }
    this.clicked = false;
  }


  //--------------------------------------------------------------------------------------DIBUJAR
  dibujar(){
    push();
      if(this.boton){ fill(map(this.link, 1,3, 0,300), 100, 75, 80); }
      else{ fill(200, 100, 100); }
      rect(this.posX,this.posY, this.tamX,this.tamY, this.tamY);

      fill(360);
      textSize(this.tam);
      textAlign(CENTER, CENTER);
      text(this.texto, this.posX,this.posY);
    pop();

    if(this.boton){ this.hover(); }
  }

  burbujear(){
    this.burbujas.burbujear();
  }

}





//--------------------------------------------------------------------------------------------------------CLASE BURBUJAS
class Burbujas{

  //--------------------------------------------------------------------------------------CONSTRUCTOR
  constructor(x, y, a, c, l){    //(posX, posY, area, cant, loop?)
    this.posX = x;
    this.posY = y;

    this.area = a;

    this.loop = l;

    this.posXb = [];
    this.posYb = [];
    this.velXb = [];
    this.velYb = [];
    
    this.cant = c;
    for(let i=0; i<this.cant; i++){
      this.reset(i);
    }
  }

  reset(_i){
    this.posXb[_i] = this.posX;
    this.posYb[_i] = this.posY;

    let vel = this.area/100;                //parámetro de velocidad de las burbujas
    this.velXb[_i] = random(-vel, vel);
    this.velYb[_i] = -random(vel/2, vel);
  }

  burbujear(){
    this.mover();
    this.dibujar();
  }


  //--------------------------------------------------------------------------------------CALCULADORA
  enArea(_i){
    return (dist(this.posXb[_i],this.posYb[_i], this.posX,this.posY) <= this.area);
  }

  mover(){
    for(let i=0; i<this.cant; i++){
      if(this.enArea(i)){
        this.posXb[i] += this.velXb[i];
        this.posYb[i] += this.velYb[i];
      }else if(this.loop){
        this.reset(i);
      }
    }
  }


  //--------------------------------------------------------------------------------------DIBUJAR
  dibujar(){
    for(let i=0; i<this.cant; i++){
      if(this.enArea(i)){
        push();
          fill(230, 100, 100, 25);
          ellipse(this.posXb[i],this.posYb[i], 20);        //dibujar burbuja
        pop();
      }
    }
  }
}
