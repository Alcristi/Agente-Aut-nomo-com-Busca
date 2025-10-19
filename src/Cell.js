class Cell {
  constructor(i, j, type) {
    this.i = i;
    this.j = j;
    this.type = type;
    this.parent = null;
  }

  show() {
    if (this.type === 4) fill(30);
    else if (this.type === 1) fill(255, 245, 160);
    else if (this.type === 2) fill(150, 100, 50);
    else if (this.type === 3) fill(100, 140, 255);
    stroke(0);
    strokeWeight(2.5);
    rect(this.i * cellSize, this.j * cellSize, cellSize, cellSize);
  }

  neighbors() {
    let list = [];
    let dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let d of dirs) {
      let ni = this.i + d[0];
      let nj = this.j + d[1];
      if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
        let neighbor = grid[ni][nj];
        if (neighbor.type !== 4) list.push(neighbor);
      }
    }
    return list;
  }
}
