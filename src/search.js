function startSearch() {
  resetParents();
  fronteira = [];
  path = [];
  finished = false;
  searching = true;

  if (searchType === "Custo Uniforme") {
    jaVisitados = new Map();
    let startNode = {
      cell: agent.cell,
      cost: 0,
    };
    fronteira.push(startNode);
    jaVisitados.set(agent.cell, 0);
  } else if (searchType === "Astar") {
    jaVisitados = new Map();
    let startNode = {
      cell: agent.cell,
      gCost: 0,
      fCost: manhattanDistance(agent.cell, foodCell),
    };
    fronteira.push(startNode);
    jaVisitados.set(agent.cell, 0);
  } else {
    // Aplica para BFS, DFS e Gulosa
    jaVisitados = [];
    fronteira.push(agent.cell);
  }
}

function bfsStep() {
  if (fronteira.length > 0) {
    let current = fronteira.shift();
    if (!jaVisitados.includes(current)) jaVisitados.push(current);

    if (current === foodCell) {
      finished = true;
      reconstructPath(current);
      searching = false;
      return;
    }

    for (let neighbor of current.neighbors()) {
      if (!jaVisitados.includes(neighbor) && !fronteira.includes(neighbor)) {
        neighbor.parent = current;
        fronteira.push(neighbor);
      }
    }
  } else {
    finished = true;
    searching = false;
  }
}

function dfsStep() {
  if (fronteira.length > 0) {
    let current = fronteira.pop();
    if (!jaVisitados.includes(current)) jaVisitados.push(current);

    if (current === foodCell) {
      finished = true;
      reconstructPath(current);
      searching = false;
      return;
    }

    for (let neighbor of current.neighbors()) {
      if (!jaVisitados.includes(neighbor) && !fronteira.includes(neighbor)) {
        neighbor.parent = current;
        fronteira.push(neighbor);
      }
    }
  } else {
    finished = true;
    searching = false;
  }
}

function gulosaStep() {
  if (fronteira.length > 0) {
    fronteira.sort(
      (a, b) => manhattanDistance(a, foodCell) - manhattanDistance(b, foodCell)
    );
    let current = fronteira.shift();
    if (!jaVisitados.includes(current)) jaVisitados.push(current);

    if (current === foodCell) {
      finished = true;
      reconstructPath(current);
      searching = false;
      return;
    }

    for (let neighbor of current.neighbors()) {
      if (!jaVisitados.includes(neighbor) && !fronteira.includes(neighbor)) {
        neighbor.parent = current;
        fronteira.push(neighbor);
      }
    }
  } else {
    finished = true;
    searching = false;
  }
}

function custoUniformeStep() {
  if (fronteira.length > 0) {
    fronteira.sort((a, b) => a.cost - b.cost);
    let currentItem = fronteira.shift();
    let current = currentItem.cell;
    let currentCost = currentItem.cost;

    if (current === foodCell) {
      finished = true;
      reconstructPath(current);
      searching = false;
      return;
    }

    for (let neighbor of current.neighbors()) {
      let newCost = currentCost + costMap[neighbor.type];

      if (jaVisitados.has(neighbor) && newCost >= jaVisitados.get(neighbor)) {
        continue;
      }

      neighbor.parent = current;
      jaVisitados.set(neighbor, newCost);

      fronteira.push({
        cell: neighbor,
        cost: newCost,
      });
    }
  } else {
    finished = true;
    searching = false;
  }
}

function Astar() {
  if (fronteira.length > 0) {
    fronteira.sort((a, b) => a.fCost - b.fCost);
    let currentItem = fronteira.shift();
    let current = currentItem.cell;

    if (current === foodCell) {
      finished = true;
      reconstructPath(current);
      searching = false;
      return;
    }

    for (let neighbor of current.neighbors()) {
      let newGCost = currentItem.gCost + costMap[neighbor.type];

      if (jaVisitados.has(neighbor) && newGCost >= jaVisitados.get(neighbor)) {
        continue;
      }

      neighbor.parent = current;
      jaVisitados.set(neighbor, newGCost);

      let newFCost = newGCost + 2.5 * manhattanDistance(neighbor, foodCell);

      const state = fronteira.find(
        (item) => item.cell.i === neighbor.i && item.cell.j === neighbor.j
      );

      if (state) {
        state.gCost = newGCost;
        state.fCost = newFCost;
      } else {
        fronteira.push({
          cell: neighbor,
          gCost: newGCost,
          fCost: newFCost,
        });
      }
    }
  } else {
    finished = true;
    searching = false;
  }
}

function manhattanDistance(a, b) {
  return abs(a.i - b.i) + abs(a.j - b.j);
}

function reconstructPath(node) {
  let temp = node;
  let rev = [];
  while (temp) {
    rev.push(temp);
    temp = temp.parent;
  }
  path = rev.reverse();
}

function keyPressed() {
  if (key === "b" || key === "B") {
    searchType = "BFS";
    newMap();
  } else if (key === "d" || key === "D") {
    searchType = "DFS";
    newMap();
  } else if (key === "u" || key === "U") {
    searchType = "Custo Uniforme";
    newMap();
  } else if (key === "g" || key === "G") {
    searchType = "Gulosa";
    newMap();
  } else if (key === "a" || key === "A") {
    searchType = "Astar";
    newMap();
  } else if (key === "r" || key === "R") {
    newMap();
  }
}
