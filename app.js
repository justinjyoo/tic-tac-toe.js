const readline = require('readline');

var ticTacToe = function () {
  this.board = [ [ 1, 2, 3 ], [ 4, 5, 6, ], [ 7, 8, 9 ] ]
  this.playerOne = '';
  this.playerTwo = '';
  this.currentPlayer = 1;
  return this;
}

ticTacToe.prototype.showBoard = function () {
  console.log(
  '\n' +
  '  --- --- ---' + '\n' +
  ' | ' + this.board[0][0] + ' | ' + this.board[0][1] + ' | ' + this.board[0][2] + ' | ' + '\n' +
  '  --- --- ---' + '\n' +
  ' | ' + this.board[1][0] + ' | ' + this.board[1][1] + ' | ' + this.board[1][2] + ' | ' + '\n' +
  '  --- --- ---' + '\n' +
  ' | ' + this.board[2][0] + ' | ' + this.board[2][1] + ' | ' + this.board[2][2] + ' | ' + '\n' +
  '  --- --- ---' + '\n'
  );
}

ticTacToe.prototype.addMarker = function (number, marker) {

  var addedState = false;
  var message = 'That number is already taken.';

  if ( !(number >= 1 || number <= 9) ) {
    console.log('Please select a number from 1 to 9.', number, typeof number);
    return addedState
  }

  this.board.forEach( (row) => {
    if( row[0] === number ) {
      row[0] = marker;
      addedState = true;
    } else if ( row[1] === number ) {
      row[1] = marker;
      addedState = true;
    } else if ( row[2] === number ) {
      row[2] = marker;
      addedState = true;
    }
  })

  return addedState;
}

ticTacToe.prototype.checkForCompletedRow = function () {
  var countX = 0;
  var countO = 0;

  this.board.forEach( (row) => {
    row.forEach( ( space ) => {
      if( space === 'x' && countX < 3 && countO < 3 ) {
        countX++;
      } else if ( space === 'o' && countX < 3 && countO < 3 ) {
        countO++;
      }
    })

    if ( countX < 3 && countO < 3 ) {
      countX = 0;
      countO = 0;
    }
  })

  return countO === 3 || countX === 3;

}

ticTacToe.prototype.checkForCompletedColumn = function () {
  var countX = 0;
  var countO = 0;

  for ( var i = 0; i < this.board.length; i++ ) {
    this.board.forEach( ( row ) => {
      if( row[i] === 'x' && countX < 3 && countO < 3 ) {
        countX++;
      } else if ( row[i] === 'o' && countX < 3 && countO < 3 ) {
        countO++;
      }
    })

    if ( countX < 3 && countO < 3 ) {
      countX = 0;
      countO = 0;
    }
  }

  return countO === 3 || countX === 3;
}

ticTacToe.prototype.checkForCompletedDiagonal = function () {
  var topLeftBottomRight = this.board[1][1] === this.board[0][0] && this.board[1][1] === this.board[2][2]
  var topRightBottomLeft = this.board[1][1] === this.board[0][2] && this.board[1][1] === this.board[2][0]

  return topLeftBottomRight || topRightBottomLeft;
}

ticTacToe.prototype.startGame = function () {
  this.showBoard();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  new Promise ( ( resolve ) => {
    rl.question('Player one will be \"x\". Please enter player one\'s name: ', (answer) => {
      this.playerOne = answer;
      rl.question('Player two will be \"o\". Please enter player two\'s name: ', (answer) => {
        this.playerTwo = answer;
        rl.close();
        resolve();
      })
    })
  }).then ( () => {
    this.newTurn();
  })


}

ticTacToe.prototype.newTurn = function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  this.showBoard();
  if( this.currentPlayer === 1 ) {
    rl.question('It is player one\'s turn. Please select a number to place an x: ', (number) => {
      this.addMarker(parseInt(number), 'x');
      ++this.currentPlayer;
      rl.close();
      if ( this.checkForCompletedRow() || this.checkForCompletedColumn() || this.checkForCompletedDiagonal() ) {
        this.showBoard();
        console.log('The x\'s won! Great job ' + this.playerOne + '!');
        return;
      }
      this.newTurn();
    })
  } else if ( this.currentPlayer === 2 ) {
    rl.question('It is player two\'s turn. Please select a number to place an o: ', (number) => {
      this.addMarker(parseInt(number), 'o');
      --this.currentPlayer;
      rl.close();
      if ( this.checkForCompletedRow() || this.checkForCompletedColumn() || this.checkForCompletedDiagonal() ) {
        this.showBoard();
        console.log('The o\'s won! Great job ' + this.playerTwo + '!');
        return;
      }
      this.newTurn();
    })
  }


}

var newGameOne = new ticTacToe()

newGameOne.startGame()
