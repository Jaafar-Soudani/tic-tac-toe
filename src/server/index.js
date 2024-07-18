/** Init variables */

const cells = document.querySelectorAll('[data-cell]');
const playerTurnElement = document.getElementById('player-turn');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const lastRoundWinner = document.getElementById('last-round-winner');
const playAgain = document.getElementById('end-game');
const playArea = document.getElementById('play-area');
const recents = document.getElementById('recents');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

const playAgainbtn = document.getElementById('play-again-button');
const resetBtn = document.getElementById('restart-button');

let isPlayerOneTurn = true;
let player1Score = 0;
let player2Score = 0;
let lastTurnWinner = '';

async function enablePlayAgain(boolVal){
    if(boolVal){
        playAgain.style.display = '';
        playArea.style.display  = 'none';
        resetBtn.style.display = 'none';
        playerTurnElement.style.display = 'none';
        player1ScoreElement.style.display = 'none';
        player2ScoreElement.style.display = 'none';
    }else{
        playAgain.style.display = 'none';
        playArea.style.display  = '';
        resetBtn.style.display = '';
        playerTurnElement.style.display = '';
        player1ScoreElement.style.display = '';
        player2ScoreElement.style.display = '';
    }
}


$.ajaxSetup({
    xhrFields: {
      withCredentials: true
    }
  });
// Function to make a GET request to the server
async function makeRequest(endpoint, params = {}) {
    const toRet =  $.ajax({
        url: `http://localhost/tic-tac-toe/${endpoint}`,
        method: 'GET',
        data: params,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
         }
     });
     return toRet;
}

// Function to start a new game
async function startGame() {
    const player1 = player1Input.value;
    const player2 = player2Input.value;
    const response = await makeRequest('start', { player1, player2 });
    updateUI(response);
    enablePlayAgain(false);
}

// Function to handle a player's move
async function handleMove(position) {
    const response = await makeRequest('move', { position });
    if (response.checkWin === 2) {
        enablePlayAgain(true);
        lastTurnWinner = `Player ${response.isPlayerOneTurn ? '2' : '1'} Won`;
    } else if (response.checkWin === 1) {
        enablePlayAgain(true);
        lastTurnWinner = "Round Draw";
    }
    updateUI(response);
   
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
    enablePlayAgain(true);
}

// Function to update the UI
function updateUI(gameState) {
    isPlayerOneTurn = gameState ? gameState.isPlayerOneTurn :  true;
    player1Score = gameState? gameState.player1Score || 0: 0;
    player2Score = gameState? gameState.player2Score  ||0: 0;
    player1Name = gameState? gameState.player1  || "Player 1" : "Player 1";
    player2Name = gameState? gameState.player2  || "Player 2" : "Player 2";
    player1ScoreElement.textContent = `${player1Name}: ${player1Score}`;
    player2ScoreElement.textContent = `${player2Name}: ${player2Score}`;
    playerTurnElement.textContent = `Player ${isPlayerOneTurn ? '1' : '2'}'s turn`;
    lastRoundWinner.innerText = lastTurnWinner;
    cells.forEach((cell, index) => {
        cell.textContent = gameState? gameState.XOArray[index] || '' : '';
    });
    pairs = gameState? gameState.recents || [] : [];
    const ul = document.createElement('ul');
    pairs.reverse().forEach(pair => {
        const li = document.createElement('li');
        li.textContent = `${pair[0]} vs ${pair[1]}`;
        ul.appendChild(li);
    });
    while (recents.firstChild) {
        recents.removeChild(recents.firstChild);
    }
    recents.appendChild(ul);

}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', async () => {
        if (cell.textContent === '') {
            await handleMove(Array.from(cells).indexOf(cell));
        }
    });
});

playAgainbtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// Start the game
//startGame('Player 1', 'Player 2');
enablePlayAgain(true);
updateUI();
