// Busca em grid + movimento do agente seguindo o caminho
// Teclas: B = BFS, D = DFS, U = Custo Uniforme, G = Gulosa, A = A*, R = novo mapa

let grid = [];
let fronteira = [];
let path = [];

let jaVisitados;
let agent;
let foodCell;

let searchType = "BFS";
let searching = false;
let finished = false;
let score = 0;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize + hudHeight);
  newMap();
}

function draw() {
  background(220);

  let gridHeight = rows * cellSize;

  // Fundo da área da grade
  push();
  fill(255);
  noStroke();
  rect(0, 0, width, gridHeight);
  pop();

  drawGrid();

  // Desenha os nós visitados (cor cinza)
  if (searchType === "Custo Uniforme" || searchType === "Astar") {
    for (let cell of jaVisitados.keys()) {
      fill(128, 128, 128, 150);
      noStroke();
      rect(cell.i * cellSize, cell.j * cellSize, cellSize, cellSize);
    }
  } else {
    for (let node of jaVisitados) {
      fill(128, 128, 128, 150);
      noStroke();
      rect(node.i * cellSize, node.j * cellSize, cellSize, cellSize);
    }
  }

  // Desenha a fronteira (cor vermelha)
  for (let node of fronteira) {
    let cell;
    if (searchType === "Custo Uniforme" || searchType === "Astar") {
      cell = node.cell;
    } else {
      cell = node;
    }
    fill(255, 0, 0);
    noStroke();
    rect(cell.i * cellSize, cell.j * cellSize, cellSize, cellSize);
  }

  // Desenha o caminho final (se houver)
  if (path.length > 0) {
    noFill();
    stroke(0, 200, 0);
    strokeWeight(3);
    beginShape();
    for (let node of path) {
      vertex(
        node.i * cellSize + cellSize / 2,
        node.j * cellSize + cellSize / 2
      );
    }
    endShape();
    strokeWeight(1);
  }

  // Anima a busca (um passo por frame enquanto não finalizado)
  if (!finished && searching) {
    if (searchType === "BFS") bfsStep();
    else if (searchType === "DFS") dfsStep();
    else if (searchType === "Custo Uniforme") custoUniformeStep();
    else if (searchType === "Gulosa") gulosaStep();
    else if (searchType === "Astar") Astar();
  }

  // Atualiza e desenha o agente
  agent.update();
  agent.show();

  // Desenha a comida
  push();
  noStroke();
  fill(242, 85, 44);
  circle(
    foodCell.i * cellSize + cellSize / 2,
    foodCell.j * cellSize + cellSize / 2,
    cellSize * 0.6
  );
  pop();

  push();
  let hudY = gridHeight;

  // Fundo do HUD
  fill(50);
  noStroke();
  rect(0, hudY, width, hudHeight);

  // Texto do HUD
  fill(255, 255, 0); // Cor amarela brilhante para o Score
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`Score: ${score}`, 10, hudY + hudHeight / 2);

  fill(255); // Cor branca para o Algoritmo/Instruções
  textSize(14);
  textAlign(RIGHT, CENTER);
  text(
    `Algoritmo: ${searchType} (B, D, U, G, A) | Novo Mapa (R)`,
    width - 10,
    hudY + hudHeight / 2
  );

  pop();

  // A mensagem de "Sem caminho" deve ser ajustada para a área da grade
  if (finished && path.length === 0 && !agent.moving) {
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(
      "Sem caminho até a comida. Pressione R para gerar novo mapa.",
      width / 2,
      gridHeight - 20
    );
  }

  if (
    finished &&
    path.length > 0 &&
    !agent.moving &&
    !agent.followingPathOnce
  ) {
    agent.followPath(path);
  }
}
