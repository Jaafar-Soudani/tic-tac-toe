The game's visual design system:

**Structural / Recurring Components:**
- **Header:** The header is styled with a dark background (`#333`) and white text. It spans the full width of the page and contains centered text.
- **Main Area:** The main area is a flex container that aligns its children (scoreboard, play area, etc.) in a column and centers them.
- **Scoreboard:** The scoreboard is a simple text display that shows the scores of Player 1 and Player 2. It is placed above the play area.
- **Player Turn:** This is a text display that shows whose turn it is. It is placed just below the scoreboard and above the play area.
- **Play Area:** The play area is a grid of 3x3 cells. Each cell is a square of 100px with a light grey background (`#f0f0f0`). The cells are flex containers that center their content.
- **End Game:** This section is displayed when the game ends. It contains the winner of the last round and a "Play again" button.
- **Restart Button:** This button allows the user to reset the game. It is placed at the bottom of the main area.

**Colour Palette:**
- The primary colours used in the game are dark grey (`#333`) for the header, white for text in the header, and light grey (`#f0f0f0`) for the cells in the play area.

**Fonts / Sizes:**
- The primary font used throughout the game is Arial, with a fallback to sans-serif. 
- The font size varies depending on the element. For example, the text in the cells of the play area is quite large (`2em`), while the text on the buttons is smaller (`1em`).

**Animations:**
- The game uses a rainbow animation for the `last-round-winner` text. This animation cycles through various colours over a 3-second period, creating a rainbow effect.

This design provides a clean and straightforward user interface for the game, making it easy for players to understand and interact with the game. The use of flexbox and grid layouts ensures that the game is responsive and can adapt to different screen sizes. The rainbow animation adds a fun and engaging visual effect to the game. The overall design is simple yet effective, focusing on functionality and usability. The code is well-structured and easy to understand, which is beneficial for maintenance and future enhancements.