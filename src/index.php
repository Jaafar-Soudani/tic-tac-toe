<?php
session_start();

// CORS stuff
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Route the requests to the appropriate function
$requestUri = $_SERVER["REQUEST_URI"];

switch ($requestUri) {
    case '/state':
        getGameState();
        break;
    case '/move':
        $pos = $_POST['position'];
        makeMove($pos);
        getGameState();
        break;
    case '/check':
        $_SESSION['checkWin'] = checkWin();
        getGameState();
    case '/reset':
        reset_board();
        http_response_code(200);
        echo json_encode(['error' => '']);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}

//* Function to initialize the session variables
function init_session(){  
    session_destroy();
    session_start();
    $_SESSION['isPlayerOneTurn'] = true;
    $_SESSION['XOArray'] = array_fill(0, 9, ""); 
    $_SESSION['checkWin'] = 0;
    $_SESSION['player1'] = "player1";
    $_SESSION['player2'] = "player2";
}

//** Function to set the player names  */
//** Sets the current player names for the current session */
//** Adds current players to most recent players array */
function setNames($player1, $player2){
    $_SESSION['player1'] = $player1;
    $_SESSION['player2'] = $player2;
    //TODO: add code to place them in "most recent players"

}

//** Function to check for a win */
//** Returns 0 if no win, 1 for a draw, 2 for a win for the current player */
function checkWin(){
    $currentPlayer = $_SESSION['isPlayerOneTurn'] ? "O": "X" ; //the order isreversed from the makeMove because makeMove immediately flips
    $XOArray = $_SESSION['XOArray'];
    $winningComintions = array(
        array(0, 1, 2), // first row
        array(3, 4, 5), // second row
        array(6, 7, 8), // third row
        array(0, 3, 6), // first column
        array(1, 4, 7), // second column
        array(2, 5, 8), // third column
        array(0, 4, 8), // diagonal from top-left to bottom-right
        array(2, 4, 6)  // diagonal from top-right to bottom-left
    );

    //first check if current player is winning
    foreach($winningComintions as $combination){
        $a = $combination[0];
        $b = $combination[1];
        $c = $combination[2];
        if( $XOArray[$a] == $currentPlayer && XOarray[$b] == $currentPlayer && XOarray[$c]==$currentPlayer){
            return 2;
        }
    }


    //then check if there's a draw
    for($i = 0; $i<9; $i++){
        $cellFull = $XOArray[$i] == "X" || $XOArray[$i] == "O";
        if(! $cellFull){
            return 1;
        }
    }

    //otherwise, game continues
    return 0;

}


//** Function to make the player's move */
function makeMove($CELL_POSITION){
    
    $currentPlayer = $_SESSION['isPlayerOneTurn'] ? "X" : "O";
    $XOArray = $_SESSION['XOArray'];
    if($XOArray[$CELL_POSITION] == "")
    {
        $XOArray[$CELL_POSITION] == $currentPlayer;
        $_SESSION['isPlayerOneTurn'] = ! $_SESSION['isPlayerOneTurn'] ;

    }
}


//** Function to reset everything */
function reset_board(){
    session_destroy();
}

//** Function to return a REST object containing game information */
function getGameState(){
    http_response_code(200);
    echo json_encode($_SESSION);
}

