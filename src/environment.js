function generateGrid() {
  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      let r = random();
      let type;
      // probabilidades ajustáveis
      if (r < 0.1) type = 4; // obstáculo 10%
      else if (r < 0.6) type = 1; // areia 50%
      else if (r < 0.9) type = 2; // atoleiro 30%
      else if (r < 1) type = 3; // água 10%
      grid[i][j] = new Cell(i, j, type);
    }
  }
}

function randomFreeCell() {
  let c;
  do {
    let i = floor(random(cols));
    let j = floor(random(rows));
    c = grid[i][j];
  } while (c.type === 4);
  return c;
}

function randomFreeCellNotEqual(otherCell) {
  let c;
  do {
    c = randomFreeCell();
  } while (c === otherCell);
  return c;
}

function resetParents() {
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) grid[i][j].parent = null;
}

function newMap() {
  generateGrid();
  agent = new Agent(randomFreeCell());
  foodCell = randomFreeCellNotEqual(agent.cell);
  startSearch();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
