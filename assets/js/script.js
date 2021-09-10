// Array of moves used more than once:

const moves = ["scissors", "paper", "rock", "lizard", "spock"];

/**
 * Create buttons object, add listeners to all buttons
 * Add listener to the "best of"
 */
function createButtons() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "best-of") {
                newGame();
            } else {
                let playerChoice = this.getAttribute("data-type");
                runGame(playerChoice);
            }
        });
    }
}

/** 
 * The function to reset the game & change best-of value
 */ 
function newGame() {

    // change best-of value
    let bestOf = parseInt(document.getElementById("best-of").innerText);
    if (bestOf < 7) {
        document.getElementById("best-of").innerText = bestOf + 2;
    } else {
        document.getElementById("best-of").innerText = 1;
    }
    // reset points and moves
    document.getElementById("score-you").innerText = 0;
    document.getElementById("score-computer").innerText = 0;
    document.getElementById("player-move").innerText = "None";
    document.getElementById("computer-move").innerText = "None";

    // turn on all buttons
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.disabled = false;
    }

    // set instructions to start value
    document.getElementById("instructions").innerText = "The arrows show what beats what.";
}

/** 
 * Main game loop. 
 * 
 */
function runGame(playerChoice) {
   
    document.getElementById("player-move").innerText = capitalizeFirst(playerChoice);
    computerMove();
    checkPoint();
}

/**
 * function that decides what move the computer makes
 */
function computerMove() {

    let move = moves[Math.floor(Math.random() * 5)];
    document.getElementById("computer-move").innerText = capitalizeFirst(move);
    return move;
}

/**
 * function to capitalize first letter of a string
 */

function capitalizeFirst(string) {

    const capitalized = string.charAt(0).toUpperCase() + string.slice(1);

    return capitalized;
}

/**
 * function to check who got the point
 */

function checkPoint() {
    // first turn the moves into a numerical value
    let pMove = document.getElementById("player-move").innerText.toLowerCase();
    let playerMove = moves.indexOf(pMove);
    if (!(playerMove === 0||playerMove === 1||playerMove === 2||playerMove === 3||playerMove === 4)) {
        alert("pMove returns: " + pMove);
    }
    let computerMove = moves.indexOf(document.getElementById("computer-move").innerText.toLowerCase());
    
        // then check the difference
    let outCome = playerMove - computerMove;
    // if 0 = draw, -1, -3, 2 or 4 win, else loss
    if (outCome === 0 ) {
       isDraw();
    } else if (outCome === -1||outCome === -3||outCome === 2||outCome === 4) {
        isWin();
    } else {
        isLoss();
    }
}

/**
 * execute draw scenario
 */
function isDraw() {
    // change player-move to move + draw
    document.getElementById("player-move").innerText = document.getElementById("player-move").innerText + " - DRAW"
    // change computer-move to move + draw
    document.getElementById("computer-move").innerText = document.getElementById("computer-move").innerText + " - DRAW"
}

/**
 * execute win scenario
 */
 function isWin() {
    // change player-move to move + win
    document.getElementById("player-move").innerText = document.getElementById("player-move").innerText + " - Win"
    // change computer-move to move + loss
    document.getElementById("computer-move").innerText = document.getElementById("computer-move").innerText + " - Loss"
    // Up score-you
    document.getElementById("score-you").innerText = parseInt(document.getElementById("score-you").innerText) + 1;
    // Check for over-all win
    endGame();
    
}

/**
 * execute loss scenario
 */
 function isLoss() {
    // change player-move to move + loss
    document.getElementById("player-move").innerText = document.getElementById("player-move").innerText + " - Loss"
    // change computer-move to move + win
    document.getElementById("computer-move").innerText = document.getElementById("computer-move").innerText + " - Win"
    // Up score-you
    document.getElementById("score-computer").innerText = parseInt(document.getElementById("score-computer").innerText) + 1;
    // Check for over-all win
    endGame();
}

/**
 * execute end of game scenario
 */

function endGame() {
    // change instructions to win/lose message
    if (parseInt(document.getElementById("score-you").innerText) > (parseInt(document.getElementById("best-of").innerText) / 2)) {
        document.getElementById("instructions").innerText = "Congratulations - You are the Winner!";
    } else if (parseInt(document.getElementById("score-computer").innerText) > (parseInt(document.getElementById("best-of").innerText) / 2)) {
        document.getElementById("instructions").innerText = "I am sorry, but the computer have you beaten!";
    } else {
        return;
    }

    // stop the game to continue unless you click best-of to reset it

    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        if (button.getAttribute("data-type") === "best-of") {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
        
    }
}

// Do not run the game until the DOM is loaded
document.addEventListener("DOMContentLoaded", createButtons());
