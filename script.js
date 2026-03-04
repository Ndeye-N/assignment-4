/**
 * Name: Ndeye Maguette Ndiaye
 * Date: 03.02.2026
 * CSC 372-01
 * Description: Logic for Rock Paper Scissors: handles player clicks, computer shuffle, and win logic.
 */

let wins = 0;
let losses = 0;
let ties = 0;
document.addEventListener("DOMContentLoaded", () => {
    const playerChoices = document.querySelectorAll(".throw-choice");
    const resetBtn = document.getElementById("reset-btn");

    playerChoices.forEach(choice => {
        choice.addEventListener("click", handlePlayerClick);
    });

    resetBtn.addEventListener("click", resetGame);
});

/**
 * @param {Event} e
 */
function handlePlayerClick(e) {
    document.querySelectorAll(".throw-choice").forEach(img => img.classList.remove("selected"));
    e.target.classList.add("selected");

    const playerChoice = e.target.alt.toLowerCase();
    startComputerTurn(playerChoice);
}

/**
 * @param {string} playerChoice
 */
function startComputerTurn(playerChoice) {
    const compImg = document.getElementById("computer-choice");
    const outcomeText = document.getElementById("outcome");
    const moves = ["rock", "paper", "scissors"];
    let count = 0;

    outcomeText.textContent = "Computer is thinking...";

    const shuffleInterval = setInterval(() => {
        compImg.src = `images/${moves[count % 3]}.PNG`;
        count++;
    }, 500);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        const randomIdx = Math.floor(Math.random() * 3);
        const computerChoice = moves[randomIdx];
        
        compImg.src = `images/${computerChoice}.PNG`;
        displayResult(playerChoice, computerChoice);
    }, 3000);
}

/**
 * @param {string} p
 * @param {string} c
 */
function displayResult(p, c) {
    const resultElement = document.getElementById("outcome");
    
    if (p === c) {
        ties++;
        document.getElementById("ties").textContent = ties;
        resultElement.textContent = "RESULTS: IT'S A TIE!";
    } else if (
        (p === "rock" && c === "scissors") ||
        (p === "paper" && c === "rock") ||
        (p === "scissors" && c === "paper")
    ) {
        wins++;
        document.getElementById("wins").textContent = wins;
        resultElement.textContent = "RESULTS: YOU WIN!";
    } else {
        losses++;
        document.getElementById("losses").textContent = losses;
        resultElement.textContent = "RESULTS: COMPUTER WINS!";
    }
}

function resetGame() {
    document.getElementById("computer-choice").src = "images/question-mark.PNG";
    document.getElementById("outcome").textContent = "";
    document.querySelectorAll(".throw-choice").forEach(img => img.classList.remove("selected"));
}