let min = 1,
  max = 10,
  guessesLeft = 3,
  winningNumber = getRandomNum(min, max);

let game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.getElementById("guess-btn"),
  guessInput = document.getElementById("guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess)) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    if (guess < min || guess > max) {
      setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    if (guess == winningNumber) {
      gameOver(`${guess} is correct, YOU WIN!`, "green");
    } else {
      if (guessesLeft > 1) {
        guessesLeft--;
        guessInput.value = "";
        setMessage(`${guess} is wrong, ${guessesLeft} guesses left.`, "red");
      } else {
        gameOver(
          `Game over. You lost. The correct number was ${winningNumber}.`,
          "red"
        );
      }
    }
  }
});

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  guessInput.style.borderColor = color;
  message.textContent = msg;
}

function gameOver(msg, color) {
  guessInput.disabled = true;
  setMessage(msg, color);

  guessBtn.textContent = "Play Again";
  guessBtn.className += " play-again";

  game.addEventListener("mousedown", function (e) {
    if (e.target.className == "play-again") {
      window.location.reload();
    }
  });
}
