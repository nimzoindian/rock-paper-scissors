let winners = [];



function startGame() {
    //Play the game until someone wins 5 times
    let imgs = document.querySelectorAll('img');
    imgs.forEach((img) => {
        img.addEventListener('click', () => {
            if (img.id) {
                playRound(img.id);
            }
        });
    });
}

function resetGame() {
    //restart the game after someone has won
    winners = [];
    document.querySelector('.playerScore').textContent = 'Score: 0';
    document.querySelector('.compScore').textContent = 'Score: 0';
    document.querySelector('.winner').textContent = ' ';
    document.querySelector('.playerChoice').textContent = ' ';
    document.querySelector('.compChoice').textContent = ' ';
    document.querySelector('.newGame').style.display = 'none';
}

function playRound(playerChoice) {
    let wins = checkWins();
    if(wins >= 5) {
        return;
    }

    const computerChoice = getCPUChoice();

    const winner = checkWinner(playerChoice, computerChoice);

    winners.push(winner);
    tallyWins();
    displayRound(playerChoice,computerChoice,winner);
    wins = checkWins();
    if(wins==5) {
        displayEnd();
    }
}

function displayEnd() {
    let playerWins = winners.filter((item) => item == 'player').length;

    if(playerWins == 5){
        document.querySelector('.winner').textContent = 'You Won 5 Games, Congrats!';
    } else {
        document.querySelector('.winner').textContent = 'Sorry, the computer won 5 times.';
    }
    document.querySelector('.newGame').style.display = 'flex';
}

function displayRound(playerChoice, compChoice, winner) {
    document.querySelector('.playerChoice').textContent = `You Chose: ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`;
    document.querySelector('.compChoice').textContent = `The Computer Chose: ${compChoice.charAt(0).toUpperCase() + compChoice.slice(1)}`;
    displayRoundWinner(winner);
}

function displayRoundWinner(winner) {
    if(winner == 'player') {
        document.querySelector('.winner').textContent = 'You won the round!';
    }
    else if (winner == 'computer') {
        document.querySelector('.winner').textContent = 'The computer won the round.';
    } else {
        document.querySelector('.winner').textContent = 'This round was a draw!';
    }
}

function tallyWins() {
    const pWinCount = winners.filter((item) => item == 'player').length;
    const cWinCount = winners.filter((item) => item == 'computer').length;
    document.querySelector('.playerScore').textContent = `Score: ${pWinCount}`
    document.querySelector('.compScore').textContent = `Score: ${cWinCount}`
}

function checkWinner(choice1, choice2) {
    if (
        (choice1 === 'rock' && choice2 === 'scissors' ||
        choice1 === 'scissors' && choice2 === 'paper' ||
        choice1 === 'paper' && choice2 === 'rock')
    ) {
        return 'player';
    } if (choice1 === choice2) {
        return 'tie';
    } else {
        return 'computer';
    } 
}

function getCPUChoice() {
    let c = Math.floor(Math.random()*3);

    if (c == 0) return 'rock';
    if (c == 1) return 'paper';
    if (c == 2) return 'scissors';
}

function checkWins() {
    const pWinCount = winners.filter((item) => item == 'player').length;
    const cWinCount = winners.filter((item) => item == 'computer').length;
    return Math.max(pWinCount,cWinCount); 
}

startGame();
