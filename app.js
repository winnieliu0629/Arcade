const gameState = {
    players: ['O', 'X'],
    currentPlayer: 0,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    checkLine: function() {
        for(let i = 0; i < this.board.length; i++){
            if(includesThree(getRow(this.board, i)) || includesThree(getColumn(this.board, i)) || includesThree(getPosDiagnal(this.board)) || includesThree(getNegDiagnal(this.board))){
                return true
            }
        }
        return false
    },
    move: function(char, numRows, numColumns) {
        if (this.board[numRows][numColumns] === null) {
          this.board[numRows][numColumns] = char;
        } 
        return this.board;
    },
    clear: function() {
        this.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
    ]
    return this.board;
  }
}

function getRow(board, numRows) {
    return board[numRows];
}

function getColumn(board, numColumns) {
    let column = [];
    for (let i = 0; i < board.length; i++){
      let row = board[i];
      column.push(row[numColumns]);
    }
    return column;
}

function getPosDiagnal(board) {
    let newGrid = [];
    for (let i = 0; i < board.length; i++){
        newGrid.push(board[i][(-1) * i + 2]);
    }
    return newGrid;
}

function getNegDiagnal(board) {
    let newGrid = [];
    for (let i = 0; i < board.length; i++){
        newGrid.push(board[i][i]);
    }
    return newGrid;
}

function includesThree(arr) {
    for(let i = 0; i < gameState.board.length; i++) {
        if (arr[i] !== gameState.players[gameState.currentPlayer]) {
            return false;
        }
    }
    return true;
}

const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const playerName = document.querySelector('#playerName');
const n1 = document.querySelector('#n1');
const n2 = document.querySelector('#n2');
const nameInput = document.querySelector('#nameInput');
const p1Input = document.querySelector('#p1Input');
const p2Input = document.querySelector('#p2Input');
const submit = document.querySelector('#submit');
const scores = document.querySelector('#scores');
const p1Name = document.querySelector('#p1Name');
const p2Name = document.querySelector('#p2Name');
const hint = document.querySelector('#hint');
const board = document.querySelector('#board');
const newGame = document.querySelector('#newGame');
const reset = document.querySelector('#reset');

let p1ButtonClicked = false;
let p2ButtonClicked = false;

p1Button.addEventListener('click', function() {
    p1Button.hidden = true;
    p2Button.hidden = true;
    playerName.hidden = false;
    n1.hidden = false;
    submit.hidden = false;
    p1ButtonClicked = true;
})

p2Button.addEventListener('click', function() {
    p1Button.hidden = true;
    p2Button.hidden = true;
    playerName.hidden = false;
    n2.hidden = false;
    submit.hidden = false;
    p2ButtonClicked = true;
})

submit.addEventListener('click',function() {
    playerName.hidden = true;
    submit.hidden = true;
    hint.hidden = false;
    board.hidden = false;
    n1.hidden = true;
    n2.hidden = true;
    scores.hidden = false;
    if(p1ButtonClicked) {
        if(nameInput.value) {
            p1Name.textContent = `${nameInput.value}(O)`;
        }
    } else {
        if(p1Input.value) {
            p1Name.textContent = `${p1Input.value}(O)`;
        } else {
            p1Name.textContent = 'Player 1(O)';
        }
        if(p2Input.value) {
            p2Name.textContent = `${p2Input.value}(X)`;
        } else {
            p2Name.textContent = 'Player 2(X)';
        }
    }
    renderBoard();
})

function renderBoard() {
    board.innerHTML = '';
    gameState.board.forEach((row, rowIndex) => {
        for(let i = 0; i < row.length; i++) {
            createCell(rowIndex, i);
        }
    })
}

function createCell(rowIndex,columnIndex) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add('hidden');
    cell.hidden = false;
    cell.dataset.row = rowIndex;
    cell.dataset.column = columnIndex;
    cell.textContent = gameState.board[rowIndex][columnIndex];
    board.appendChild(cell);
    console.log('click');
}

board.addEventListener('click', function(event) {
    if(event.target.matches('.cell')) {
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        if(gameState.board[row][column] == null) {
            gameState.board[row][column] = gameState.players[gameState.currentPlayer];
            checkWin();
        } else {
            hint.textContent = `${gameState.players[gameState.currentPlayer]} turn`;
        }
    }
    renderBoard();
})

function checkWin() {
    if(gameState.checkLine() == true) {
        hint.textContent = `${gameState.players[gameState.currentPlayer]} win!`
    } else {
        changePlayer();
        hint.textContent = `${gameState.players[gameState.currentPlayer]} turn`
    }
}
function changePlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
}

// const move = setInterval( function() {

// },1000)

newGame.addEventListener('click', function() {
    p1Button.hidden = false;
    p2Button.hidden = false;
    playerName.hidden = true;
    submit.hidden = true;
    n1.hidden = true;
    n2.hidden = true;
    scores.hidden = true;
    hint.hidden = true;
    board.innerHTML = '';
    gameState.clear;
})

reset.addEventListener('click', function() {
    gameState.clear();
    console.log(gameState.board);
})