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
    checkNull: function() {
        for(let i = 0; i < this.board.length; i++){
            for(let j = 0; j < this.board.length; j++){
                if(this.board[i][j] == null){
                    return true;
                }
            }
        }
        return false;
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
const p1Label = document.querySelector('#p1Label');
const p2Label = document.querySelector('#p2Label');
const p1Input = document.querySelector('#p1Input');
const p2Input = document.querySelector('#p2Input');
const submit = document.querySelector('#submit');
const scores = document.querySelector('#scores');
const p1Name = document.querySelector('#p1Name');
const p2Name = document.querySelector('#p2Name');
const hint = document.querySelector('#hint');
const board = document.querySelector('#board');

let p1ButtonClicked = false;
let p2ButtonClicked = false;

p1Button.addEventListener('click', function() {
    p1Button.hidden = true;
    p2Button.hidden = true;
    playerName.hidden = false;
    p1Label.hidden = false;
    p1Label.textContent = 'Enter your name:';
    p1Input.hidden = false;
    submit.hidden = false;
    p1ButtonClicked = true;
})

p2Button.addEventListener('click', function() {
    p1Button.hidden = true;
    p2Button.hidden = true;
    playerName.hidden = false;
    p1Label.hidden = false;
    p1Label.textContent = 'Player1 name:';
    p2Label.hidden = false;
    p1Input.hidden = false;
    p2Input.hidden = false;
    submit.hidden = false;
    p2ButtonClicked = true;
})

submit.addEventListener('click',function() {
    playerName.hidden = true;
    p1Label.hidden = true;
    p2Label.hidden = true;
    p1Input.hidden = true;
    p2Input.hidden = true;   
    submit.hidden = true;
    hint.hidden = false;
    board.hidden = false;
    scores.hidden = false;
    updateName();
    renderBoard();
})

function updateName() {
    if(p1ButtonClicked) {
        if(!p1Input.value) {
            p1Input.value = 'You';
        }
        p2Input.value = 'Computer';
        p1Name.textContent = `${p1Input.value}(O)`;
        p2Name.textContent = `${p2Input.value}(X)`;
    } else {
        if(!p1Input.value) {
            p1Input.value = 'Player 1';
        }
        if(!p2Input.value) {
            p2Input.value = 'Player 2';
        } 
        p1Name.textContent = `${p1Input.value}(O)`;
        p2Name.textContent = `${p2Input.value}(X)`;
    }
}

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

const p1WinEl = document.querySelector('#p1WinEl');
const tieEl = document.querySelector('#tieEl');
const p2WinEl = document.querySelector('#p2WinEl');
let p1Win = 0;
let tie = 0;
let p2Win = 0;

function checkWin() {
    if(gameState.checkLine() == true) {
        if(gameState.currentPlayer == 0) {
            p1Win++;
            hint.textContent = `${p1Input.value} win!`
            gameState.clear();
            changePlayer();
        } else {
            p2Win++;
            hint.textContent = `${p2Input.value} win!`
            gameState.clear();
            changePlayer();
        }
    } else if(gameState.checkNull() == false) {
        tie++;
        hint.textContent = `Tie!`
        gameState.clear();
        changePlayer();
    } else {
        changePlayer();
        hint.textContent = `${gameState.players[gameState.currentPlayer]} turn`
    }
    updateScores();
}

function updateScores() {
    p1WinEl.textContent = p1Win;
    tieEl.textContent = tie;
    p2WinEl.textContent = p2Win;
}

function changePlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
}

// const move = setInterval( function() {

// },1000)

const newGame = document.querySelector('#newGame');
const reset = document.querySelector('#reset');

newGame.addEventListener('click', function() {
    p1Button.hidden = false;
    p2Button.hidden = false;
    playerName.hidden = true;
    p1Label.hidden = true;
    p2Label.hidden = true;
    p1Input.hidden = true;
    p2Input.hidden = true;
    submit.hidden = true;
    scores.hidden = true;
    hint.hidden = true;
    board.innerHTML = '';
    resetGame();
    p1Input.value = '';
    p2Input.value = '';
    p1Name.textContent = '';
    p2Name.textContent = '';
    p1ButtonClicked = false;
    p2ButtonClicked = false;
})

reset.addEventListener('click', function() {
    resetGame();
    renderBoard();
})

function resetGame() {
    p1Win = 0;
    tie = 0;
    p2Win = 0;
    updateScores();
    gameState.clear();
    hint.textContent = 'Place three in a row!';
}