let board = [];
let currentPlayer = 'X';
let gameOver = false;
let isTwoPlayer = true;
let isComputerPlaying = false;

document.getElementById('two-player').addEventListener('click', () => startGame(true));
document.getElementById('one-player').addEventListener('click', () => startGame(false));
document.getElementById('new-game').addEventListener('click', () => startGame(isTwoPlayer));

function startGame(twoPlayerMode) {
    isTwoPlayer = twoPlayerMode;
    isComputerPlaying = !twoPlayerMode;
    currentPlayer = 'X';
    gameOver = false;
    board = Array(9).fill(null);
    
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    
    renderBoard();
    document.getElementById('message').textContent = '';
}

function renderBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
    
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => makeMove(index));
        boardContainer.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    renderBoard();
    
    if (checkWinner(currentPlayer)) {
        gameOver = true;
        document.getElementById('message').textContent = `${currentPlayer} játékos nyert!`;
        return;
    }
    
    if (board.every(cell => cell !== null)) {
        gameOver = true;
        document.getElementById('message').textContent = 'A játék döntetlen.';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isComputerPlaying && currentPlayer === 'O') {
        computerMove();
    }
}

function computerMove() {
    let availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    
    board[randomMove] = 'O';
    renderBoard();
    
    if (checkWinner('O')) {
        gameOver = true;
        document.getElementById('message').textContent = 'A számítógép nyert!';
    } else if (board.every(cell => cell !== null)) {
        gameOver = true;
        document.getElementById('message').textContent = 'A játék döntetlen.';
    }
    
    currentPlayer = 'X';
}

function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];
    
    return winningCombos.some(combo => combo.every(index => board[index] === player));
}
