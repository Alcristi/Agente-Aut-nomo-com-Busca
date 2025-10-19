class Agent {
  constructor(cell) {
    this.cell = cell;
    this.pos = createVector(
      cell.i * cellSize + cellSize / 2,
      cell.j * cellSize + cellSize / 2
    );
    this.pathCells = [];
    this.pathIndex = 0;
    this.moving = false;
    this.followingPathOnce = false;
    this.baseSpeed = 4.0;
  }

  followPath(cells) {
    this.pathCells = cells.slice();
    this.pathIndex = 1;
    this.moving = this.pathCells.length > 1;
    this.followingPathOnce = true;
  }

  update() {
    if (!this.moving) return;

    if (this.pathIndex >= this.pathCells.length) {
      this.moving = false;
      return;
    }

    let targetCell = this.pathCells[this.pathIndex];
    let targetPos = createVector(
      targetCell.i * cellSize + cellSize / 2,
      targetCell.j * cellSize + cellSize / 2
    );

    let targetCost = costMap[targetCell.type];
    let speed = this.baseSpeed * (1.0 / targetCost);

    let desired = p5.Vector.sub(targetPos, this.pos);
    let d = desired.mag();

    if (d < 0.6) {
      this.pos = targetPos.copy();
      this.cell = targetCell;
      this.pathIndex++;

      if (this.pathIndex >= this.pathCells.length) {
        this.moving = false;
        this.reachGoal();
      }
    } else {
      desired.normalize();
      desired.mult(speed);
      this.pos.add(desired);
    }
  }

  reachGoal() {
    if (this.cell === foodCell) {
      score++;
      foodCell = randomFreeCellNotEqual(this.cell);
      this.followingPathOnce = false;
      startSearch();
    } else {
      this.followingPathOnce = false;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(20, 200, 20);
    stroke(0);
    strokeWeight(1);
    circle(0, 0, cellSize * 0.6);
    pop();
  }
}
