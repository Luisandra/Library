var p1Button = document.getElementById("p1");
var p1DisplayScore = document.querySelector("#p1Display");
var p1Score = 0;

var p2Button = document.querySelector("#p2");
var p2DisplayScore = document.querySelector("#p2Display");
var p2Score = 0;

var resetButton = document.querySelector("#resetScore");

var gameOver=false;
var gameCount = document.querySelector("input");

var playTill=document.querySelector("p span");
var winningScore=5;


// var displayGame = getElementById("gameEnd");
// displayGame.textContent = playTill;

p1Button.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;
        if(p1Score==winningScore){
            gameOver=true;
            p1DisplayScore.classList.add("winner");
            alert ("Player 1 WINS!");
            p2DisplayScore.classList.add("loser");
        }
        p1DisplayScore.textContent = p1Score;
    }
});

p2Button.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
    if(p2Score===winningScore){
        gameOver=true;
        p2DisplayScore.classList.add("winner");
        alert ("Player 2 WINS!");
        p1DisplayScore.classList.add("loser");       
    }
    p2DisplayScore.textContent = p2Score;
    }
    
});

function reset (){
    p1Score=0;
    p1DisplayScore.textContent = p1Score;
    p1DisplayScore.classList.remove ("winner");
    p1DisplayScore.classList.remove ("loser");

    p2Score=0;
    p2DisplayScore.textContent = p1Score;
    p2DisplayScore.classList.remove ("winner");
    p2DisplayScore.classList.remove ("loser");

    playTill.textContent=("5");
    gameOver=false;
};

resetButton.addEventListener ("click", function(){
    reset;
});



gameCount.addEventListener("change", function(){
    playTill.textContent=gameCount.value;
// playtill is a String, which cannot be compared to Number. Need to converto to number    
    winningScore=Number(gameCount.value);
// supposed to reset counter but it doesnt' work
//     reset();
});