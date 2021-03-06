class Board {
  constructor () {
    this.status = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ];
    this.win = false;
    this.checkersInRow = 1;
  }

  updateBoard (col, color) {
    let column = this.updateCol(col);
    let row = this.updateRow(column, color);

    return [column, row];
  }


  checkUpperLeftdownRight (column, row) {
    let color = this.status[row][column];
    let tempArr = [color];
    let tempArr2 = [];
    if (column >= 3 && row >= 2) {
      let tempRow = row;
      for (let i = column; i > 0; i--) {
        tempRow--;
        if (tempRow > 1) {
          if (this.status[tempRow][i - 1] === color) {
            tempArr.push(this.status[tempRow][i - 1]);
          }
        }
      }
    }

    if (column >= 1 && row >= 2) {
      let tempRow = row;
      for (let j = column; j < 6; j++) {
        tempRow++;
        if (tempRow <= 6 && tempRow > 1) {
          if (this.status[tempRow][j + 1] === color) {
            tempArr2.push(this.status[tempRow][j + 1]);
          }
        }
      }
    }
    let finalArr = tempArr.concat(tempArr2);
    let numOfCheckers = 0;
    for (let a = 0; a < finalArr.length; a++) {
      if (finalArr[a] === color) {
        numOfCheckers++;
        if (numOfCheckers >= 4) {
          this.win = true;
        }
      }
    }
  }

  checkUpperRightDownLeft (column, row) {
    let color = this.status[row][column];

    let tempArr = [color];
    let tempArr2 = [];

    if (column <= 3 && row >= 2) {
      let tempRow = row;

      for (let i = column; i < 6; i++) {
        tempRow--;

        if (tempRow > 1 && this.status[tempRow][i + 1] === color) {
          tempArr.push(this.status[tempRow][i + 1]);
        }
      }
    }

    if (column >= 1 && row >= 2) {
      let tempRow = row;

      for (let j = column; j > 1; j--) {
        tempRow++;
        if (tempRow <= 6 && tempRow > 1) {

          if (this.status[tempRow][j - 1] === color) {
            tempArr2.push(this.status[tempRow][j - 1]);
          }
        }
      }
    }

    let finalArr = tempArr.concat(tempArr2);
    let numOfCheckers = 0;

    for (let a = 0; a < finalArr.length; a++) {

      if (finalArr[a] === color) {
        numOfCheckers++;
        if (numOfCheckers >= 4) {

          this.win = true;
        }
      }
    }

  }

  checkDiagonalWin (column, row) {
    this.checkUpperLeftdownRight(column, row);
    this.checkUpperRightDownLeft(column, row);
  }

  checkVerticalWin (column, player) {
    player = player === 'red' ? 'blue' : 'red';
    let tempArr = [];
    for (let i = 1; i < 7; i++) {
      if (this.status[i][column] !== null) {
        tempArr.push(this.status[i][column]);
        let result = tempArr.reduce((counter, value) => {
          if (value === player) {
            return counter += 1;
          }
        }, 0);
        if (result === 4) {
          this.win = true;
        }
      }
    }
  }

  checkHorizontalWin () {
    for (let i = 1; i < 7; i++) {
      let checkersInRow = 1;

      for (let j = 0; j < 7; j++) {
        if (this.status[i][j] === this.status[i][j + 1] && this.status[i][j + 1] !== null) {
          checkersInRow++;
        } else {
          checkersInRow = 1;
        }
        if (checkersInRow === 4) {
          this.win = true;
        }
      }
    }
  }

  updateCol (col) {
    if (col === 50) {
      return 0;
    } else if (col === 150) {
      return 1;
    } else if (col === 250) {
      return 2;
    } else if (col === 350) {
      return 3;
    } else if (col === 450) {
      return 4;
    } else if (col === 550) {
      return 5;
    } else {
      return 6;
    }
  }

  updateRow (column, color) {
    for (let i = 6; i >= 1; i--) {
      if (this.status[i][column] === null) {
        this.status[i][column] = color;
        return i;
      }
    }
  }

}

module.exports = Board;