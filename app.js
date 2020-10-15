document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("start-button");
  const width = 10;
  var speed = 1000;
  //The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];
  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);

  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) =>
      squares[index + currentPosition].classList.add("tetromino")
    );
  }

  function undraw() {
    current.forEach((index) =>
      squares[index + currentPosition].classList.remove("tetromino")
    );
  }

  // I put the tetromino to move

  // intervalID = window.setInterval(movedown, 1000);
  intervalID = window.setInterval(movedown, speed);
  console.log("intervalID --> ", intervalID);

  function speedUp() {
    window.clearInterval(intervalID);
    speed -= 100;
    intervalID = window.setInterval(movedown, speed);
    console.log("velocidad = ", speed);
  }
  function movedown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }
  function rotate() {
    undraw();
    if (currentRotation === 3) {
      currentRotation = 0;
    } else {
      currentRotation += 1;
      current = theTetrominoes[random][currentRotation];
    }
  }
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      speedUp();
    } else if (e.keyCode === 38) {
      rotate();
      console.log("currentRotation ", currentRotation);
    }
  }
  document.addEventListener("keyup", control);

  function freeze() {
    if (
      current.some((index) =>
        squares[index + currentPosition + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[index + currentPosition].classList.add("taken")
      );
      currentPosition = 4;
      random = Math.floor(Math.random() * theTetrominoes.length);

      current = theTetrominoes[random][currentRotation];
      speed = 1000;
      currentRotation = 0;
      draw();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }
  function moveRight() {
    undraw();
    const isARightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isARightEdge) currentPosition += 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }
});
