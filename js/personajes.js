//--------------------------------------------------------------------------------------------------------CLASE TIBURÓN
class Shark {

  //--------------------------------------------------------------------------------------CONSTRUCTOR
  constructor(){
    this.posX = width/2;
    this.posY = height/2;

    this.velX = 5;                    //velocidad por defecto en X y de interacción en Y
    this.velYdefault = 1;             //velocidad por defecto en Y
    this.velY = this.velYdefault;
    this.direcX = signoRandom();
    this.direcY = signoRandom();

    this.estado = NORMAL;
    this.mirando = random([0,1]);

    this.sprites = imgShark;
    this.spriteActual = this.sprites[this.estado][this.mirando];

    this.tamX = 200;                                        //ancho de las imágenes
    this.tamY = nuevoAlto(this.spriteActual, this.tamX);

    this.bocaX = this.posX+this.direcX*this.tamX*2/6;       //posición y tamaño de la boca
    this.bocaY = this.posY+10;
    this.bocaR = this.tamX/3;

    this.contadorEnfermo = 0;
    this.tiempoEnfermoBase = 3;                             //tiempo (en segundos) que tarda en pasar el veneno
    this.tiempoEnfermo = this.tiempoEnfermoBase * frameRate();
  }


  //--------------------------------------------------------------------------------------CALCULADORA
  reset(){
    this.estado = NORMAL;
    this.contadorEnfermo = 0;
    this.posX = width/2;
    this.posY = height/2;
  }

  //-------------------------------------------------------------------CONTROLES
  controles(){
    if(keyIsDown(W) || keyIsDown(S)){
      this.velY = this.velX;
      if(keyIsDown(W)){
        this.direcY = -1;         //mover arriba con W
      }
      else if(keyIsDown(S)){
        this.direcY = +1;         //mover abajo con S
      }
    }
    else{
      this.velY = this.velYdefault;   //mover abajo despacio si no se toca nada
      this.direcY = +1;
    }
    
    if(this.estado != ENFERMO){
      if(keyIsDown(F)){
        this.estado = MORDER;       //abrir la boca con F
      }
      else{
        this.estado = NORMAL;
      }
    }

    this.tiempoEnfermo = this.tiempoEnfermoBase * frameRate();
    if(this.estado == ENFERMO){
      if(this.contadorEnfermo < this.tiempoEnfermo){
        this.contadorEnfermo++;
      }
      else{
        this.estado = NORMAL;
        this.contadorEnfermo = 0;
      }
    }
  }


  //-------------------------------------------------------------------MOVIMIENTO
  mover(){
    if((this.posX + this.tamX/2) > width){   //rebotar con borde derecho
      this.direcX = -1;
    }
    else if((this.posX - this.tamX/2) < 0){   //rebotar con borde izquierdo
      this.direcX = +1;
    }

    this.posX += this.velX*this.direcX;     //DESPLAZAR
    this.posY += this.velY*this.direcY;
    this.posY = constrain(this.posY, (0+this.tamY/2),(height-this.tamY/2));

    if(this.direcX < 0){ this.mirando = DERECHA; }   //cambiar imagen según la dirección
    else{ this.mirando = IZQUIERDA; }
  }


  //-------------------------------------------------------------------ENFERMAR
  enfermar(){ this.estado = ENFERMO; }


  //--------------------------------------------------------------------------------------DIBUJO
  dibujar(){
    this.spriteActual = this.sprites[this.estado][this.mirando];    //actualizar datos de imagen
    this.tamY = nuevoAlto(this.spriteActual, this.tamX);

    this.bocaX = this.posX+this.direcX*this.tamX*2/6;       //actualizar posición de la boca
    this.bocaY = this.posY+10;

    image(this.spriteActual, this.posX,this.posY, this.tamX,this.tamY);

    if(debug && (this.estado == MORDER)){        //visualizar boca
      push();
        fill(360, 50);
        ellipse(this.bocaX,this.bocaY, this.bocaR);
      pop();
    }
  }
}





//--------------------------------------------------------------------------------------------------------CLASE PEZ
class Fish {

  //--------------------------------------------------------------------------------------CONSTRUCTOR
  constructor(t){     //¿es venenoso? true/false
    this.posX;
    this.posY;

    this.velTotal = random(10,20);              //velocidad base
    this.velX;
    this.velY;
    this.direcX = signoRandom();
    this.direcY = signoRandom();

    this.mirando = random([0,1]);

    this.sprites = imgFish;
    this.spriteActual = this.sprites[this.mirando];

    this.tamX = 70;                                        //ancho de las imágenes
    this.tamY = nuevoAlto(this.spriteActual, this.tamX);

    this.comido = false;
    this.contadorRespawn = 0;
    this.tiempoRespawnBase = 4;        //tiempo (en segundos) que tarda en reaparecer tras ser comido
    this.tiempoRespawn = this.tiempoRespawnBase * frameRate();

    this.tipo = t;
    if(this.tipo == VENENOSO){
      this.velTotal = this.velTotal*1.5;          //velocidad base del venenoso
    }

    this.burbujas;

    this.reset();
  }


  //--------------------------------------------------------------------------------------CALCULADORA
  reset(){
    this.comido = false;
    this.contadorRespawn = 0;
    this.respawn();
    this.burbujas = new Burbujas(0,0,0,0, false);
  }


  //-------------------------------------------------------------------MOVIMIENTO
  mover(){
    if(this.comido == false){
      if((this.posX + this.tamX/2) > width){   //rebotar con borde derecho
        this.direcX = -1;
      }
      else if((this.posX - this.tamX/2) < 0){   //rebotar con borde izquierdo
        this.direcX = +1;
      }

      if((this.posY + this.tamY/2) > height){   //rebotar con borde inferior
        this.direcY = -1;
      }
      else if((this.posY - this.tamY/2) < 0){   //rebotar con borde superior
        this.direcY = +1;
      }

      this.posX += this.velX*this.direcX;     //DESPLAZAR
      this.posY += this.velY*this.direcY;

      if(this.direcX < 0){ this.mirando = DERECHA; }   //cambiar imagen según la dirección
      else{ this.mirando = IZQUIERDA; }
    }
    else{
      this.tiempoRespawn = this.tiempoRespawnBase * frameRate();
      if(this.contadorRespawn < this.tiempoRespawn){
        this.contadorRespawn++;
      }
      else{
        this.comido = false;
        this.contadorRespawn = 0;
      }
    }
  }


  //-------------------------------------------------------------------COMIDO
  comer(){
    this.comido = true;
    this.contadorRespawn = 0;
    this.burbujas = new Burbujas(this.posX,this.posY+this.tamY/3, this.tamX*2, 15, false);
  }

  respawn(){
    this.posX = random(this.tamX, width-this.tamX);
    this.posY = random(this.tamY, height-this.tamY);

    this.velX = random(this.velTotal*3/10,this.velTotal*7/10);
    this.velY = this.velTotal-this.velX;

    this.direcX = signoRandom();
    this.direcY = signoRandom();
  }


  //--------------------------------------------------------------------------------------DIBUJO
  dibujar(){
    this.spriteActual = this.sprites[this.mirando];
    this.tamY = nuevoAlto(this.spriteActual, this.tamX);      //actualizar tamaño de imagen

    if(this.comido == false){
      push();
        if(this.tipo == VENENOSO){ tint(100,75,50); }
        image(this.spriteActual, this.posX,this.posY, this.tamX,this.tamY);
      pop();

      if(debug){        //visualizar área de colisión
        push();
          if(this.tipo == VENENOSO){ fill(100,75,50,75); }
          else{ fill(100,100,100,75); }
          ellipse(this.posX,this.posY, this.tamX,this.tamY);          
        pop();
      }
    }

    this.burbujas.burbujear();
  }
}
