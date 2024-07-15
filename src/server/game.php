<?php
session_start();

// Initialize game state if it doesn't exist
if (!isset($_SESSION['game_state'])) {
    $_SESSION['game_state'] = [
        'board' => array_fill(0, 9, ''),
        'current_player' => 'X',
        'player1_score' => 0,
        'player2_score' => 0,
        'last_winner' => ''
    ];
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ... (code to handle AJAX requests)
}

// Return the current game state as JSON
header('Content-Type: application/json');
echo json_encode($_SESSION['game_state']);
