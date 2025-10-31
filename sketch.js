let table;

//posizioni x e y
let x_pos;
let y_pos;
let z_pos;

// colonne
let colonne = [];

//grandezza canvas
let contentWidth = 800;
let contentHeight = 600;

// linee di mezzo per valori negativi
let xLine;
let yLine;

// minimi e massimi x e y
let xMin;
let xMax;
let yMin;
let yMax;
let zMin;
let zMax;

let currentIndex = 0;
let isPlaying = false;


function preload(){

table = loadTable("assets/drone_charlie_data.csv", "csv", "header");

}

function setup(){

for(let i = 0; i < 7; i ++){
let colums = table.getColumn(i);
colonne[i] = colums.map(i => float(i))

}; // prendo tutte e 7 le colonne del dataset

console.log("Colonne:", colonne);


new p5(sketch, 'drone');

}

let sketch = function(p){
p.setup = function(){
p.createCanvas(contentWidth, contentHeight, p.WEBGL);


// identifico le linne di mezzo
xLine = p.width / 2;
yLine = p.height / 2;


// valori massimi eminimi di x per poi andare ad usare la funzione .map
xMin = Math.min(...colonne[2])
xMax = Math.max(...colonne[2])




// stessa cosa per i valori di y
yMin = Math.min(...colonne[3])
yMax = Math.max(...colonne[3])


// valori z
zMin = Math.min(...colonne[4]);
zMax = Math.max(...colonne[4]);


console.log("Minimo X", xMin)
console.log("Massimo X", xMax)
console.log("Minimo y", yMin)
console.log("Massimo y", yMax)

p.keyPressed = function() {
  if (p.key === ' ') { // spazio
    isPlaying = !isPlaying; // alterna play/pausa
  }
};

p.drawVerticalGrid = function (){
  p.push();

  // Sposta la griglia leggermente indietro rispetto al centro
  p.translate(0, 0, -400); // sposta sul piano YZ
  //p.rotateY(p.HALF_PI);    // ruota la griglia di 90° attorno all'asse Y

  p.stroke(180, 70);
  p.strokeWeight(0.5);

  let gridSize = 800;
  let step = 40;

  // linee parallele agli assi Y e Z
  for (let y = -gridSize / 2; y <= gridSize / 2; y += step) {
    p.line(-gridSize / 2, y, 0, gridSize / 2, y, 0);
  }
  for (let z = -gridSize / 2; z <= gridSize / 2; z += step) {
    p.line(z, -gridSize / 2, 0, z, gridSize / 2, 0);
  }

  p.pop();
}

}

p.draw = function(){

p.clear();


p.orbitControl() //Da vedere se tenere o meno

p.drawVerticalGrid(); 

p.push();

// abbasso un po' la griglia sotto al centro della scena
p.translate(0, 200, 0);

p.stroke(180, 70);
p.strokeWeight(0.5);

// dimensione del piano
let gridSize = 800;
let step = 50;

// linee parallele all’asse X e Z
for (let x = -gridSize / 2; x <= gridSize / 2; x += step) {
  p.line(x, 0, -gridSize / 2, x, 0, gridSize / 2); // linee lungo Z
}
for (let z = -gridSize / 2; z <= gridSize / 2; z += step) {
  p.line(-gridSize / 2, 0, z, gridSize / 2, 0, z); // linee lungo X
}

p.pop();

if (isPlaying && currentIndex < colonne[2].length) {

currentIndex+=10; // incrementa ad ogni frame

}



//pallini per la posizione
p.push()

for(let i = 0; i < colonne[3].length; i+=10){
if( i < currentIndex){
x_pos = p.map(colonne[2][i], xMin, xMax, -contentWidth / 2, contentHeight / 2);
y_pos = p.map(colonne[3][i], yMin, yMax, contentHeight / 2, -contentHeight / 2);
z_pos = p.map (colonne[4][i], zMin, zMax, -400, 400)


/*p.stroke(28, 28, 28)
p.strokeWeight(0.1)
p.fill(220, 50)
p.circle(x_pos, y_pos, 10)*/

p.push()
p.translate(x_pos, y_pos, z_pos);
p.noStroke()
p.fill(255, 131, 0, 70)
p.sphere(4)
p.pop()

}

}

p.pop()

}

}
