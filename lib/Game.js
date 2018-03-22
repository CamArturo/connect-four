const Board = require('./Board.js');
const Red = require('./Red.js');
const Blue = require('./Blue.js');

class Game {
  constructor (context, canvasHeight, canvasWidth) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.context = context;
    this.gameLoop = this.gameLoop.bind(this);
    this.red = new Red();
    this.blue = new Blue();
    this.gameBoard = new Board();
    this.playerRed = true;
    this.checkersOnBoard = [];
    this.redScore = 0;
    this.blueScore = 0;
  }

  static drawBoard (context) {
    for (let i = 0; i <= 600; i = i + 100) {
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.moveTo(i, 100);
      context.lineTo(i, 700);
      context.stroke();

      for (let j = 100; j <= 600; j = j + 100) {
        context.moveTo(0, j);
        context.lineTo(700, j);
        context.strokeStyle = 'black';
        context.stroke();
      }
    }
  }

  drawPieces () {
    this.checkersOnBoard.forEach(function (item) {
      this.context.beginPath();
      this.context.arc(item[0], item[1], 40, 0, Math.PI * 2);
      this.context.fillStyle = item[2];
      this.context.fill();
    }.bind(this));
  }

  checkMaxCheckers () {
    if (this.checkersOnBoard.length === 42) {
      this.gameBoard = new Board();
      this.context.clearRect(0, 0, 700, 700);
      this.checkersOnBoard = [];
    }
  }

  moveChecker (key) {
    if (this.playerRed) {
      this.red.selectCol(key, this);
    } else {
      this.blue.selectCol(key, this);
    }
  }

  switchPlayer (player, column, row) {
    this.gameBoard.checkHorizontalWin();
    this.gameBoard.checkVerticalWin(column, player);
    this.gameBoard.checkDiagonalWin(column, row, player);
    if (player === 'red') {
      this.red = new Red();
      this.red.draw(this.context);
    } else {
      this.blue = new Blue();
      this.blue.draw(this.context);
    }
    this.checkMaxCheckers();
  }

  updateScore () {
    document.getElementById('red-score').innerText = this.redScore;
    document.getElementById('blue-score').innerText = this.blueScore;
  }

  gameLoop () {
    this.context.clearRect(0, 0, 700, 700);
    Game.drawBoard(this.context);
    this.drawPieces();

    if (this.playerRed) {
      this.red.draw(this.context);
    } else {
      this.blue.draw(this.context);
    }

    if (this.gameBoard.win) {
      let winnerColor = this.playerRed ? 'Blue' : 'Red';
      if (winnerColor === 'Red') {
        this.redScore++;
      } else {
        this.blueScore++;
      }
      document.getElementById('show-winner').innerText = winnerColor + ' Wins!!'
      this.updateScore();
      this.gameBoard = new Board();
      this.context.clearRect(0, 0, 700, 700);
      this.checkersOnBoard = [];
      this.gameBoard.win = false;
      window.requestAnimationFrame(this.gameLoop);
    } else {
      window.requestAnimationFrame(this.gameLoop);
    }
  }
}

module.exports = Game;