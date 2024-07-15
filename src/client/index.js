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



//** Function to check if current player has already one */
const checkWin = () => {
    const currentPlayer = isPlayerOneTurn ? 'X' : 'O';
    const XOarray = Array.from(cells).map(cell => cell.innerText);
    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], // first row
        [3, 4, 5], // second row
        [6, 7, 8], // third row
        [0, 3, 6], // first column
        [1, 4, 7], // second column
        [2, 5, 8], // third column
        [0, 4, 8], // diagonal from top-left to bottom-right
        [2, 4, 6]  // diagonal from top-right to bottom-left
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (XOarray[a] === currentPlayer && XOarray[b] === currentPlayer && XOarray[c] === currentPlayer) {
            return true;
        }
    }
    return false;
}


//** Function to check if the  */
const checkDraw = () => {
    const XOarray = Array.from(cells).map(cell => cell.innerText);
    return XOarray.filter(str => str == "").length == 0;

}

const enablePlayAgain = (state) =>{
    if(!state){
        playAgain.style.display = "none";
        playArea.style.display = "";
    }else{
        playAgain.style.display = "";
        playArea.style.display = "none";

    }
}

/** Button click handler, taking element position as argument */
const handleClick = (e) => {
    const cell = e.target;
    const currentPlayer = isPlayerOneTurn ? 'X' : 'O';
    cell.textContent = currentPlayer;
    cell.removeEventListener('click', handleClick);
    
    if (checkWin(currentPlayer)) {
        enablePlayAgain(true);
        if (isPlayerOneTurn) {
            player1Score++;
            lastTurnWinner = "Player 1 Won";
        } else {
            player2Score++;
            lastTurnWinner = "Player 2 Won";
        }
    } else if (checkDraw()) {
        enablePlayAgain(true);
        lastTurnWinner = "Round Draw"
    } else {
        isPlayerOneTurn = !isPlayerOneTurn;
    }
    updateUI();
};

const restartGame = () =>{
    enablePlayAgain(false);
    isPlayerOneTurn = true;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick);
    });

}

const resetGameState = () =>{
    player1Score = 0;
    player2Score = 0;

    restartGame();
}


playAgainbtn.addEventListener('click', restartGame);
resetBtn.addEventListener('click', resetGameState);
resetGameState();


/** Update UI function, changes Init variables and sets them to their place */
const updateUI = () =>{
    player1ScoreElement.textContent = `Player 1: ${player1Score}`;
    player2ScoreElement.textContent = `Player 2: ${player2Score}`;
    playerTurnElement.textContent = `Player ${isPlayerOneTurn ? '1' : '2'}'s turn`;
    lastRoundWinner.innerText = lastTurnWinner;
}