const gameBoard = Array.from(document.querySelectorAll('.box'));
const resetBtn = document.getElementById('reset');
const playerMessage = document.querySelector('#messages > h1');

const playerOne = '❤️';
const playerTwo = '💋';

let currentPlayer = playerOne;

let gameOver = false;

const resetGame = () => {
  resetBtn.style.display = 'none';

  currentPlayer = playerOne;

  playerMessage.innerText = `Player ${currentPlayer} Starts`;

  gameBoard.forEach((box) => {
    box.innerText = '';
    box.classList.remove('win');
    box.style.cursor = '';
    gameOver = false;
  });
};

const onBoxClick = (event) => {
  if (gameOver) return;
  const box = event.target;
  if (!box.innerText) {
    box.innerText = currentPlayer;
    checkWinner();
  } else {
    playerMessage.innerText = 'That square is taken!';
  }
};

const checkWinner = () => {
  const winCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // second row
    [6, 7, 8], // third row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // left diagonal
    [2, 4, 6], // right diagonal
  ];

  const winIndex = winCombinations
    .map((winCombo) =>
      winCombo.every(
        (boxIndex) => gameBoard[boxIndex].innerText === currentPlayer
      )
    )
    .indexOf(true);

  if (winIndex !== -1) {
    endGame(true, winCombinations[winIndex]);
  } else if (gameBoard.every((box) => box.innerText)) {
    endGame(false);
  } else {
    switchPlayer();
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  playerMessage.innerText = `Player ${currentPlayer}'s Turn`;
};

const endGame = (isWin, winBoxes) => {
  gameOver = true;
  msg = isWin ? 'Player ' + currentPlayer + ' wins the match!' : 'No one wins';
  playerMessage.innerText = msg;
  resetBtn.style.display = 'block';
  gameBoard.forEach((box) => {
    box.style.cursor = 'not-allowed';
  });
  if (isWin) {
    showWinner(winBoxes);
  }
};

const showWinner = (winIndices) => {
  winIndices.forEach((index) => gameBoard[index].classList.add('win'));
};

const init = () => {
  gameBoard.forEach((box) => box.addEventListener('click', onBoxClick));
  resetBtn.addEventListener('click', resetGame);
};

init();
