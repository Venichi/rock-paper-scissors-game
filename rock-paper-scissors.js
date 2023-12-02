let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loss: 0,
    ties: 0
}   


function pickComputerMove() {
    randomNumber = Math.random();
    computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }  
    return computerMove;
}

function playGame(playerMove) {
    computerMove = pickComputerMove();
    let result= '';          

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'you lose';
        } else if (computerMove === 'paper') {
            result = 'you win';
        } else if (computerMove === 'scissors') {
            result = 'tie';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'you win';
        } else if (computerMove === 'paper') {
            result = 'tie';
        } else if (computerMove === 'scissors') {
            result = 'you lose';
        }
        
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'tie';
        } else if (computerMove === 'paper') {
            result = 'you lose';
        } else if (computerMove === 'scissors') {
            result = 'you win';
        }
    }

    if (result === 'you win') {
        score.wins += 1; 
    } else if (result === 'you lose') {
        score.loss += 1;
    } else if (result === 'tie') {
        score.ties += 1;
    }
    
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElem();

    document.querySelector('.js-result')
    .innerHTML = result;

    document.querySelector('.js-moves')
    .innerHTML = 
    `You <img class="image" src="Images/${playerMove}.webp">
    <img class="image" src="Images/${computerMove}.webp"> Computer`;
    
}

function updateScoreElem () {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} |  Loss: ${score.loss} |  Tie: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// }

function autoPlay () {

    if (!isAutoPlaying) {
        intervalId =  setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
            isAutoPlaying = true;
            
            document.querySelector('.js-autoplay-button')
            .innerHTML = 'Stop Play';

        }, 1000)
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        
        document.querySelector('.js-autoplay-button')
        .innerHTML = 'Auto Play';
    }   
}

