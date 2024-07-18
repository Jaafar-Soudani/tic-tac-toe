<?php
//suppress warnings
error_reporting(0);

session_start();


$_SESSION['cookie_data'] = $_COOKIE;



// Route the requests to the appropriate function
$requestUri = $_SERVER["REQUEST_URI"];
$seg_arr = array_filter(explode('/', explode('?', $requestUri)[0]));
$lastSegment = end($seg_arr);

//Handle AJAX request
switch ($lastSegment) {
    case 'game':
        // Serve HTML content
        header('Content-Type: text/html');
        readfile('index.html');
        break;
    case 'style.css':
        // Serve CSS content
        header('Content-Type: text/css');
        readfile('style.css');
        break;
    case 'index.js':
        // Serve JavaScript content
        header('Content-Type: application/javascript');
        readfile('index.js');
        break;
    case 'start':
        init_session();
        setNames($_GET['player1'], $_GET['player2']);
        getGameState();
        break;
    case 'state':
        getGameState();
        break;
    case 'move':
        $pos = $_GET['position'];
        makeMove($pos);
    case 'check':
        checkWin();
        getGameState();
        break;
    case 'reset':
        reset_board();
        http_response_code(200);
        init_session();
        getGameState();
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found', 'uri'=> $lastSegment, 'post' => $_GET]);
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
        if( $XOArray[$a] == $currentPlayer && $XOArray[$b] == $currentPlayer && $XOArray[$c]==$currentPlayer){
            $_SESSION['checkWin'] = 2;
            return;
        }
    }


    //then check if there's a draw
    for($i = 0; $i<9; $i++){
        $cellFull = $XOArray[$i] == "X" || $XOArray[$i] == "O";
        if(! $cellFull){
            $_SESSION['checkWin'] = 1;
            return;
        }
    }

    //otherwise, game continues
    $_SESSION['checkWin'] = 0;
    return 0;

}


//** Function to make the player's move */
function makeMove($CELL_POSITION){
    
    $currentPlayer = $_SESSION['isPlayerOneTurn'] ? "X" : "O";
    if($_SESSION["XOArray"][$CELL_POSITION] == "")
    {
        $_SESSION["XOArray"][$CELL_POSITION] = $currentPlayer;
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

