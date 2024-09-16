let input;
let button;
let leaveNoteButton;
let colorButtons = [];
let previewBox;
let isLeavingNote = false;
let pastelColors = [
  "#FFB6C1",
  "#87CEFA",
  "#98FB98",
  "#FFD700",
  "#FFA07A",
  "#FF69B4",
  "#00FA9A",
  "#B0E0E6",
];
let messages = [];
let draggingNote = null;
let enlargedNote = null;
let customFont;
let backgroundImage;
let pinImage;
let puedeGuardar = false;
let tamanoXCanva = 370;
let tamanoYcanva = 601;

function preload() {
  customFont = loadFont("../assets/DarumadropOne-Regular.ttf");
  backgroundImage = loadImage("../assets/img/fondoCorcho.png");
  backgroundImage2 = loadImage("../assets/img/fondoCorchoLargo.png");
  pinImage = loadImage("../assets/img/pinchito.png");
}

function setup() {
  let canvasDiv = document.querySelector("#canvas");
  let theCanvas = createCanvas(tamanoXCanva, tamanoYcanva);
  theCanvas.parent(canvasDiv);
  createInterface();

  // Load existing notes
  existingNotes.forEach((note) => {
    messages.push(
      new Message(
        note.mensaje,
        note.posX * width,
        note.posY * height,
        note.color
      )
    );
  });


  textFont(customFont);
}

function draw() {
  background(backgroundImage2);

  for (let message of messages) {
    if (message !== enlargedNote) {
      message.display();
    }
  }

  if (enlargedNote) {
    enlargedNote.display(true); // Mostrar la nota agrandada sobre las demás
  }

  if (isLeavingNote) {
    previewBox.display();
  }
  document.getElementById("pagina").style.position = "relative";
  document.getElementById("pagina").style.overflow = "hidden";
  document.getElementById("pagina").style.margin = "32px 0px";


  if (draggingNote) {    

 

    draggingNote.updatePosition(
      constrain(
        mouseX - draggingNote.offsetX,
        draggingNote.width / 5,
        width - (draggingNote.width * 6) / 5
      ),
      constrain(
        mouseY - draggingNote.offsetY,
        draggingNote.height / 5,
        height - (draggingNote.height * 6) / 5
      )
    );
  } else {
  }
}

function disableScroll() {}

function enableScroll() {}

function createInterface() {
  leaveNoteButton = document.getElementById("botonDejarNota");


  leaveNoteButton.onclick = () => {
    isLeavingNote = !isLeavingNote;
    toggleInterface(isLeavingNote);
    if (isLeavingNote) {
      showPreview();
    }
  };

  pastelColors.forEach((color, i) => {
    let colorButton = createButton("");
    colorButton.size(30, 30);
    colorButton.style("background-color", color);
    colorButton.mousePressed(() => {
      previewBox.updateColor(color);
    });
    colorButtons.push(colorButton);
  });

  input = createInput();
  input.input(() => {
    if (input.value().length > 30) {
      input.value(input.value().substring(0, 30)); // Limita a 20 caracteres
    }
    showPreview();
  });

  button = createButton("Enviar");
  button.mousePressed(addMessage);
  button.style(`
    background-color: #FF8181;
    color: black;
    padding: 10px 20px;
    border: 1px solid;
    border-radius: 20px;
    cursor: pointer;
    font-family: "Darumadrop One", sans-serif;
    font-size: 16px;
  `);

  adjustInterfacePositions();

  toggleInterface(false);


  let initialColor = color("#FFB6C1");
  previewBox = new PreviewBox(
    width / 2 - 100,
    (height * 1) / 3 - 100,
    initialColor
  );
  previewBox.hide();
}

function adjustInterfacePositions() {

  tamanoXCanva = windowWidth * 0.9;
  tamanoYcanva = map(tamanoXCanva, 900, 370,600, 500);
  tamanoYcanva = constrain(
    tamanoYcanva,
    (windowHeight * 3) / 5,
    (windowHeight * 4) / 5
  );

  resizeCanvas(tamanoXCanva, tamanoYcanva);

  let newX = width / 2 - (colorButtons.length / 2) * 30;
  let newY = height * 0.75;





  if (windowWidth > 850)
    {  colorButtons.forEach((button, i) => {
      button.position(newX+70 + i * 30, newY-90);
    });
      input.position(newX+75, newY -15);

      button.position(input.x + input.width , input.y - 10);

    }
else{

  colorButtons.forEach((button, i) => {
    button.position(newX + i * 30, newY);
  });
    input.position(newX, newY + 55);

    button.position(input.x + input.width + 10, input.y - 10);
}
}

function toggleInterface(show) {
  if (show) {
    input.show();
    button.show();
    colorButtons.forEach((button) => button.show());
  } else {
    input.hide();
    button.hide();
    colorButtons.forEach((button) => button.hide());
  }
}

function showPreview() {
  previewBox.show();
  previewBox.updateText(input.value());
  // leaveNoteButton.hide();
  leaveNoteButton.style.display = "none";
}

function addMessage() {
  let inputText = input.value();
  let x = random(width - 50);
  let y = random(height - 50);
  let color = previewBox.color.toString("#rrggbb");

  let newMessage = new Message(inputText, x, y, color);
  document.getElementById("botonCrearMuro").style.display = "block";

  messages.push(newMessage);
  input.value("");
  if (isLeavingNote) {
    previewBox.hide();
    toggleInterface(false);
  }

  input.hide();
  button.hide();
  colorButtons.forEach((button) => button.hide());
  // leaveNoteButton.hide();

  document.getElementById("falseInputNotita").value = inputText;
  document.getElementById("falseInputPosX").value = x / width;
  document.getElementById("falseInputPosY").value = y / height;
  document.getElementById("falseInputColor").value = color;

  $.ajax({
    type: "POST",
    url: "guardarNota.php",
    data: $("#falseForm").serialize(),
    success: function (response) {
      console.log("Nota guardada:", response);
    },
  });
}

function doubleClicked() {
  for (let message of messages) {
    if (message.isMouseInside()) {
      enlargedNote = message;
      return;
    }
  }
  enlargedNote = null;
}

let isDragging = false; // Nueva variable

function mousePressed() {
  for (let message of messages) {
    if (message.isMouseInside()) {
      draggingNote = message;
      message.offsetX = mouseX - message.x;
      message.offsetY = mouseY - message.y;
      isDragging = true; // Indica que se está arrastrando
      return;
    }
  }
}

function mouseReleased() {
  if (draggingNote) {
    $.ajax({
      type: "POST",
      url: "actualizarNota.php",
      data: {
        mensaje: draggingNote.text,
        posX: draggingNote.x / width,
        posY: draggingNote.y / height,
        color: draggingNote.color,
      },
      success: function (response) {
        console.log("Posición de la nota actualizada:", response);
      },
    });
  }
  draggingNote = null;
  isDragging = false; // Resetea al soltar
}

function mouseClicked() {
  console.log(messages[0].x);

  if (!isDragging) {
    // Solo ejecuta si no se está arrastrando
    if (enlargedNote && enlargedNote.isMouseInside()) {
      enlargedNote = null;
    } else {
      for (let message of messages) {
        if (message.isMouseInside() && windowWidth < 490) {
          enlargedNote = message;
          return;
        }
      }
    }
  }
}


class Message {
  constructor(text, x, y, color) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.color = color;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display(enlarged = false) {
    textFont(customFont);
    let wrappedText = this.splitTextIntoLines(this.text, 12); // Dividir el texto en líneas
    let textY = enlarged ? this.y + 100 : this.y + this.height / 2;

    if (enlarged) {
      fill(this.color);
      noStroke();
      rect(this.x, this.y, 200, 200);
      if (draggingNote !== this) {
        image(pinImage, this.x + 90, this.y, 20, 20);
      }
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(24);
      text(wrappedText, this.x + 100, textY);
    } else {
      fill(this.color);
      noStroke();
      rect(this.x, this.y, this.width, this.height);
      if (draggingNote !== this) {
        image(pinImage, this.x + this.width / 2 - 10, this.y, 20, 20);
      }
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      text(wrappedText, this.x + this.width / 2, textY);
    }
  }

  splitTextIntoLines(text, maxCharsPerLine) {
    let lines = [];
    for (let i = 0; i < text.length; i += maxCharsPerLine) {
      lines.push(text.substring(i, i + maxCharsPerLine));
    }
    return lines.join("\n");
  }

  isMouseInside() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    );
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}


class PreviewBox {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 200;
    this.color = color;
    this.visible = false;
    this.text = "";
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  updateText(text) {
    this.text = text;
  }

  updateColor(newColor) {
    this.color = newColor;
  }

  display() {
    if (this.visible) {
      fill(0, 100);
      rect(0, 0, windowWidth, windowHeight);
      fill(this.color);
      noStroke();
      rect(this.x, this.y, this.width, this.height);
      if (!isLeavingNote) {
        image(pinImage, this.x + this.width / 2 - 10, this.y, 20, 20);
      }
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
  }
}
