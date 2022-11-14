const gameState = {
    players: ["O", "X"],
    currentPlayer: 0,
    numRows: 3,
    numColumns: 3,
    board: [],
    createBoard: function () {
    let board = [];
    for (let i = 0; i < this.numRows; i++) {
        board[i] = [];
        for (let j = 0; j < this.numColumns; j++) {
        board[i][j] = null;
        }
    }
    this.board = board;
    return board;
    },
    checkLine: function () {
        for (let i = 0; i < this.board.length; i++) {
            if (
                includesThree(getRow(this.board, i)) ||
                includesThree(getColumn(this.board, i)) ||
                includesThree(getPosDiagnal(this.board)) ||
                includesThree(getNegDiagnal(this.board))
            ) {
            return true;
            }
        }
        return false;
    },
    checkNull: function () {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] == null) {
                    return true;
                }
            }
        }
        return false;
    },
    randomMove: function () {
        while (this.checkNull) {
            i = randomNum(this.board);
            j = randomNum(this.board);
            if (this.board[i][j] == null) {
            this.board[i][j] = "X";
            return this.board;
            }
        }
    },
    smartMove: function(maxIndex) {
        if (maxIndex == 0) {
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i][-1 * i + this.board.length - 1] == null) {
                    this.board[i][-1 * i + this.board.length - 1] = "X";
                    return this.board;
                }
            }
        } else if (maxIndex == 1) {
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i][i] == null) {
                    this.board[i][i] = "X";
                    return this.board;
                }
            }
        } else if (maxIndex == -1) {
            return this.randomMove();
        } else if (maxIndex <= 2 + this.board.length) {
            let row = maxIndex - 2;
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[row][i] == null) {
                    this.board[row][i] = "X";
                    return this.board;
                }
            }
        } else {
            let column = maxIndex - this.board.length - 2;
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i][column] == null) {
                    this.board[i][column] = "X";
                    return this.board;
                }
            }
        }
    }
};

function randomNum(board) {
    return Math.floor(Math.random() * board.length);
}
  
function getRow(board, numRows) {
    return board[numRows];
}
  
function getColumn(board, numColumns) {
    let column = [];
    for (let i = 0; i < board.length; i++) {
      let row = board[i];
      column.push(row[numColumns]);
    }
    return column;
}
  
function getPosDiagnal(board) {
    let newGrid = [];
    for (let i = 0; i < board.length; i++) {
      newGrid.push(board[i][-1 * i + board.length - 1]);
    }
    return newGrid;
}
  
function getNegDiagnal(board) {
    let newGrid = [];
    for (let i = 0; i < board.length; i++) {
      newGrid.push(board[i][i]);
    }
    return newGrid;
}
  
function includesThree(arr) {
    for (let i = 0; i < gameState.board.length; i++) {
      if (arr[i] !== gameState.players[gameState.currentPlayer]) {
        return false;
      }
    }
    return true;
}

function getMaxCount(board, player) {
    let count = 0;
    let maxCount = -1;
    let maxIndex = -1;
    let maxArray = [];

    const posDiagnal = getPosDiagnal(board);
    for (let i = 0; i < posDiagnal.length; i++) {
        if (player == posDiagnal[i]) {
            count++;
        }
    }
    if (count > maxCount) {
        if (posDiagnal.includes(null)) {
            maxCount = count;
            maxIndex = 0;
            maxArray = getPosDiagnal(board);
        }
    }
    count = 0;
    const negDiagnal = getNegDiagnal(board);
    for (let i = 0; i < negDiagnal.length; i++) {
        if (player == negDiagnal[i]) {
            count++;
        }
    }
    if (count > maxCount) {
        if (negDiagnal.includes(null)) {
            maxCount = count;
            maxIndex = 1;
            maxArray = getNegDiagnal(board);
        }
    }
    for (let i = 0; i < board.length; i++) {
        const row = getRow(board, i);
        let count = 0;
        for (let j = 0; j < row.length; j++) {
            if (player == row[j]) {
                count++;
            }
        }
        if (count > maxCount) {
            if (row.includes(null)) {
                maxCount = count;
                maxIndex = 2 + i;
                maxArray = getRow(board, i);
            }
        }
    }
    for (let i = 0; i < board.length; i++) {
        const column = getColumn(board, i);
        let count = 0;
        for (let j = 0; j < column.length; j++) {
            if (player == column[j]) {
            count++;
            }
        }
        if (count > maxCount) {
            if (column.includes(null)) {
                maxCount = count;
                maxIndex = 2 + board.length + i;
                maxArray = getColumn(board, i);
            }
        }
    }
    return maxIndex;
}

const boardSize = document.querySelector("#boardSize");
const board3x3 = document.querySelector("#board3x3");
const board4x4 = document.querySelector("#board4x4");
const p1Button = document.querySelector("#p1Button");
const p2Button = document.querySelector("#p2Button");
const playerName = document.querySelector("#playerName");
const p1Label = document.querySelector("#p1Label");
const p2Label = document.querySelector("#p2Label");
const p1Input = document.querySelector("#p1Input");
const p2Input = document.querySelector("#p2Input");
const submit = document.querySelector("#submit");
const scores = document.querySelector("#scores");
const p1Name = document.querySelector("#p1Name");
const p2Name = document.querySelector("#p2Name");
const hint = document.querySelector("#hint");
const board = document.querySelector("#board");
  
board3x3.addEventListener("click", function () {
    board3x3.hidden = true;
    board4x4.hidden = true;
    p1Button.hidden = false;
    p2Button.hidden = false;
    gameState.numRows = 3;
    gameState.numColumns = 3;
    gameState.createBoard();
    console.log(gameState.board);
    hint.textContent = "Place 3 in a row!";
});
  
board4x4.addEventListener("click", function () {
    board3x3.hidden = true;
    board4x4.hidden = true;
    p1Button.hidden = false;
    p2Button.hidden = false;
    gameState.numRows = 4;
    gameState.numColumns = 4;
    gameState.createBoard();
    hint.textContent = "Place 4 in a row!";
});
  
let p1ButtonClicked = false;
let p2ButtonClicked = false;
  
p1Button.addEventListener("click", function () {
    p1Button.hidden = true;
    p2Button.hidden = true;
    playerName.hidden = false;
    p1Label.hidden = false;
    p1Label.textContent = "Enter your name:";
    p1Input.hidden = false;
    submit.hidden = false;
    p1ButtonClicked = true;
});
  
p2Button.addEventListener("click", function () {
    p1Button.hidden = true;
    p2Button.hidden = true;
    playerName.hidden = false;
    p1Label.hidden = false;
    p1Label.textContent = "Player1 name:";
    p2Label.hidden = false;
    p1Input.hidden = false;
    p2Input.hidden = false;
    submit.hidden = false;
    p2ButtonClicked = true;
});
  
submit.addEventListener("click", function () {
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
    randomStart();
    renderBoard();
});
  
function updateName() {
    if (p1ButtonClicked) {
        if (!p1Input.value) {
            p1Input.value = "You";
        }
        p2Input.value = "Computer";
        p1Name.textContent = `${p1Input.value}(O)`;
        p2Name.textContent = `${p2Input.value}(X)`;
} else {
        if (!p1Input.value) {
            p1Input.value = "Player 1";
        }
        if (!p2Input.value) {
            p2Input.value = "Player 2";
        }
        p1Name.textContent = `${p1Input.value}(O)`;
        p2Name.textContent = `${p2Input.value}(X)`;
    }
  }
  
function renderBoard() {
    board.innerHTML = "";
    gameState.board.forEach((row, rowIndex) => {
        for (let i = 0; i < row.length; i++) {
            createCell(rowIndex, i);
        }
    });
}
  
function createCell(rowIndex, columnIndex) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (gameState.numRows == 3) {
        board.classList.remove("smallBoard", "largeBoard");
        cell.classList.remove("small", "large");
        board.classList.add("smallBoard");
        cell.classList.add("small");
    } else {
        board.classList.remove("smallBoard", "largeBoard");
        cell.classList.remove("small", "large");
        board.classList.add("largeBoard");
        cell.classList.add("large");
    }
    cell.classList.add("hidden");
    cell.hidden = false;
    cell.dataset.row = rowIndex;
    cell.dataset.column = columnIndex;
    cell.textContent = gameState.board[rowIndex][columnIndex];
    board.appendChild(cell);
}
  
board.addEventListener("click", function (event) {
    if (event.target.matches(".cell")) {
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        if (gameState.board[row][column] == null) {
            gameState.board[row][column] = gameState.players[gameState.currentPlayer];
            checkWin();
            if (p1ButtonClicked) {
                gameState.smartMove(getMaxCount(gameState.board, gameState.players[0]));
                checkWin();
            }
            renderBoard();
        } else {
            hint.textContent = `${gameState.players[gameState.currentPlayer]} turn`;
        }
    }
});
  
const p1WinEl = document.querySelector("#p1WinEl");
const tieEl = document.querySelector("#tieEl");
const p2WinEl = document.querySelector("#p2WinEl");
let p1Win = 0;
let tie = 0;
let p2Win = 0;
  
function checkWin() {
    if (gameState.checkLine() == true) {
        if (gameState.currentPlayer == 0) {
            p1Win++;
            hint.textContent = `${p1Input.value} win!`;
            gameState.createBoard();
            changePlayer();
        } else {
            p2Win++;
            hint.textContent = `${p2Input.value} win!`;
            gameState.createBoard();
            changePlayer();
        }
    } else if (gameState.checkNull() == false) {
        tie++;
        hint.textContent = `Tie!`;
        gameState.createBoard();
        changePlayer();
    } else {
        changePlayer();
        hint.textContent = `${gameState.players[gameState.currentPlayer]} turn`;
    }
    updateScores();
}

function updateScores() {
    p1WinEl.textContent = p1Win;
    tieEl.textContent = tie;
    p2WinEl.textContent = p2Win;
}

function randomPlayer() {
    return Math.floor(Math.random() * 2);
}

function randomStart() {
    gameState.currentPlayer = randomPlayer();
    console.log(randomPlayer());
    if (gameState.currentPlayer == 1) {
        if (p1ButtonClicked) {
            gameState.randomMove();
            changePlayer();
        }
    }
}

function changePlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
}

const newGame = document.querySelector("#newGame");
const reset = document.querySelector("#reset");

newGame.addEventListener("click", function () {
    board3x3.hidden = false;
    board4x4.hidden = false;
    p1Button.hidden = true;
    p2Button.hidden = true;
    playerName.hidden = true;
    p1Label.hidden = true;
    p2Label.hidden = true;
    p1Input.hidden = true;
    p2Input.hidden = true;
    submit.hidden = true;
    scores.hidden = true;
    hint.hidden = true;
    board.innerHTML = "";
    resetGame();
    p1Input.value = "";
    p2Input.value = "";
    p1Name.textContent = "";
    p2Name.textContent = "";
    p1ButtonClicked = false;
    p2ButtonClicked = false;
});

reset.addEventListener("click", function () {
    resetGame();
    renderBoard();
});

function resetGame() {
    p1Win = 0;
    tie = 0;
    p2Win = 0;
    updateScores();
    gameState.createBoard();
    hint.textContent = "New start!";
}
