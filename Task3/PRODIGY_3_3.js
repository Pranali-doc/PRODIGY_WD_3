// script.js
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'T'; // Return 'T' for tie
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.innerHTML = `<span>${currentPlayer}</span>`;
    e.target.style.color = currentPlayer === 'X' ? '#ff6f61' : '#61dafb'; // Color X and O differently

    const winner = checkWinner();
    if (winner) {
        gameStatus.textContent = winner === 'T' ? "It's a Tie!" : `Player ${winner} Wins!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.color = '#333';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
