/** Init variables */
const cells = document.querySelectorAll('[data-cell]');
const playerTurnElement = document.getElementById('player-turn');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const lastRoundWinner = document.getElementById('last-round-winner');
const playAgain = document.getElementById('end-game');
const playArea = document.getElementById('play-area');

const playAgainbtn = document.getElementById('play-again-button');
const resetBtn = document.getElementById('restart-button');

let isPlayerOneTurn = true;
let player1Score = 0;
let player2Score = 0;
let lastTurnWinner = '';

// Function to make a GET request to the server
async function makeRequest(endpoint, params = {}) {
    const url = new URL(`http://localhost/tic-tac-toe/${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    return response.json();
}

// Function to start a new game
async function startGame(player1, player2) {
    const response = await makeRequest('start', { player1, player2 });
    updateUI(response);
    enablePlayAgain(false);
}

// Function to handle a player's move
async function handleMove(position) {
    const response = await makeRequest('move', { position });
    updateUI(response);
    if (response.checkWin === 2) {
        enablePlayAgain(true);
        lastTurnWinner = `Player ${response.isPlayerOneTurn ? '2' : '1'} Won`;
    } else if (response.checkWin === 1) {
        enablePlayAgain(true);
        lastTurnWinner = "Round Draw";
    }
}

// Function to check the game state
async function checkGameState() {
    const response = await makeRequest('check');
    updateUI(response);
}

// Function to reset the game
async function resetGame() {
    const response = await makeRequest('reset');
    updateUI(response);
    enablePlayAgain(false);
}

// Function to update the UI
function updateUI(gameState) {
    isPlayerOneTurn = gameState.isPlayerOneTurn;
    player1Score = gameState.player1Score || 0;
    player2Score = gameState.player2Score || 0;
    player1ScoreElement.textContent = `Player 1: ${player1Score}`;
    player2ScoreElement.textContent = `Player 2: ${player2Score}`;
    playerTurnElement.textContent = `Player ${isPlayerOneTurn ? '1' : '2'}'s turn`;
    lastRoundWinner.innerText = lastTurnWinner;
    cells.forEach((cell, index) => {
        cell.textContent = gameState.XOArray[index] || '';
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', async () => {
        if (cell.textContent === '') {
            await handleMove(Array.from(cells).indexOf(cell));
        }
    });
});

playAgainbtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

// Start the game
startGame('Player 1', 'Player 2');
