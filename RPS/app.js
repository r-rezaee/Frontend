// ##### cashing dom
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const resutl_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");
const reset_button = document.querySelector(".reset-button");
const userMove_icon = document.querySelector('#user-move > img');
const compMove_icon = document.querySelector('#comp-move > img');
const user_move = document.querySelector('#user-move');
const comp_move = document.querySelector('#comp-move');

// ###### Functions

// return ComputerChoice
function getComputerChoice(){
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
    
}

function convertToWord(letter) {
    if (letter === 'r') return ('Rock');
    if (letter === 'p') return ('Paper');
    if (letter === 's') return ('Scissor');
}


function win(userChoice, computerChoice){
    userScore++;
    const userChoice_div = document.getElementById(userChoice);
    
    userScore_span.innerHTML = userScore;
    resutl_p.innerHTML = 'User Wins';
    userChoice_div.classList.add('win-glow');
    setTimeout(() => userChoice_div .classList.remove('win-glow'), 400);
}



function lost(userChoice, computerChoice){
    computerScore++;
    const userChoice_div = document.getElementById(userChoice);
    computerScore_span.innerHTML = computerScore;
    resutl_p.innerHTML = 'User Lost';
    userChoice_div.classList.add('lost-glow');
    setTimeout(() => userChoice_div.classList.remove('lost-glow'), 400);
}


function draw(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);
    resutl_p.innerHTML = 'It is a draw';
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 400);

}


function show(userChoice, computerChoice){
    
    const userMove = convertToWord(userChoice).toLowerCase();
    const compMove = convertToWord(computerChoice).toLowerCase();

    userMove_icon.src = `images/${userMove}.png`; 
    userMove_icon.alt = userMove;
    compMove_icon.src = `images/${compMove}.png`; 
    compMove_icon.alt = compMove;
    user_move.classList.add('user-fight');
    comp_move.classList.add('comp-fight');

    setTimeout(() => {
        user_move.classList.remove('user-fight');
        comp_move.classList.remove('comp-fight');
    }, 500)
}


function game(userChoice){
    const computerChoice = getComputerChoice();
    show(userChoice, computerChoice);
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            //console.log("User Wins!");
            win(userChoice, computerChoice);
            break;

        case "sr":
        case "rp":
        case "ps":
            //console.log("User Loses!");
            lost(userChoice, computerChoice);
            break;
        
        case "rr":
        case "pp":
        case "ss":
            console.log("Its a draw");
            draw(userChoice, computerChoice);
            break;
    }
}


// ###### Adding EventHandlers to dom
function main(){
    rock_div.addEventListener('click', () => game('r'));
    
    paper_div.addEventListener('click', () => game('p'));
    
    scissor_div.addEventListener('click', () => game('s'));

    reset_button.addEventListener('click', () => {
        userScore = 0;
        computerScore = 0;
        userScore_span.innerHTML = 0;
        computerScore_span.innerHTML = 0;
        resutl_p.innerHTML = "Please choose your move";
    });
}


main();