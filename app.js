console.log('js works!')

const game = {
    score: 0,
    time: 15,
    gameOver: true
}

// we will need a random number for both choosing a random hole, and define random time

function generateRandomNumber(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

//test the function if it running
// for(let i = 0; i < 10; i++) {
//     console.log(generateRandomNumber(10));
// }   //works

/*
- whene the mole is visible:
    - if game is over (timer is zero) do nothing
    - mole face change to 'hit'
    - score goes up, one point
    - mole disappear
*/
// Get reference to all DOM elements needed
const scoreElement = document.getElementById('scoreText');
const timeElement = document.getElementById('timeText');
const holesElements = document.getElementsByClassName('hole');

// this function get executed when clicking on
// a 'hole div' (div with the css class named 'hole')

function whack(event){
    // 2. check if the game is over - if so - do nothing
    if(game.gameOver) return;
    // console.log(event.target.classList);
    // 1. check if the mole is visible - the class 'up' presents
    if(event.target.classList.contains('up')) {
        // console.log('HIT a Mole');

        // if not - change the class of the mole to 'hit'
        event.target.classList.replace('up', 'hit');
        // and add one point to the score
        game.score += 1;

        // update the score adding one point
        scoreElement.innerText = game.score;
        // scoreElement = document.getElementById('score').innerText = game.score;
        // and remove the class 'up' from the mole

        setTimeout(() => {
            event.target.classList.remove('hit');
          }, 300);
        // setTimeout(function() {
        //     event.target.classList.remove('hit');
        // }, 800);
    }
    
    // the mole should disappeard - remove all css classes exept 'hole'

}
    // const testHole = document.getElementById('testBtn');
    // testHole.addEventListener('click', whack);

/* Handle Mole appearance in random hole.
    add the class 'up' on one of the holes div (div with CDD class hole)
    and after a period of time, remove the class 'up' to make it disappear
*/

function moleAppear(){
    // if game is over, return
    if(game.gameOver) return;
   // generate random number between 0 and the number of holes
    const randomNumber = generateRandomNumber(holesElements.length);

   // the holes are collection of divs
   // get one of the holes with this number as an index
    const randomHoleElement = holesElements[randomNumber];
   // add the class 'up' to make the mole appear
   randomHoleElement.classList.add('up');

   // after some time, remove the class 'up' to make it disappear
    // const timerId = setTimeout(function() {
    //     randomHoleElement.classList.remove('up');
    setTimeout(() => {
        randomHoleElement.classList.remove('up');
        moleAppear();
        // if the score is 10, the game is over
        // if(!game.score === 10) {
        //     // start the game again
        //     
        // } else {
        // //     clearTimeout(timerId);
        // //     game.gameOver = true;
        // //     document.getElementById('hole').classList.remove('up');
        // //     document.getElementById('hole').classList.remove('hit');
        // }
        
    }, 1000);
}

// Executed when clicking on the hole with the 'start'
function startGame() {
    game.score = 0;
    // first, set gameOver flag to false
    game.gameOver = false;
    document.getElementById("gameOver").querySelector("h2").innerText = " ";

    // remove the start class from the first hole
    // and attach whack to the click event
    holesElements[2].classList.remove('start');
    holesElements[2].removeEventListener('click', startGame);

    // start a timer that update the game time
    const timerId = setInterval(function() {
        // game.time -= 1;

        // if the time is 0, stop the timer and stop the game
        if(game.time === 0) {
            // add to div gameOver in <h2> the letter 'Game Over'
            // JavaScript code to add 'Game Over' to the <h2> element
            

            document.getElementById("gameOver").querySelector("h2").innerText = "Game Over";


            clearInterval(timerId);
            resetGame();

            // document.getElementById('hole').classList.remove('up');
            // document.getElementById('hole').classList.remove('hit');

            // // show the score in the score div (div with id: score)
            // scoreElement.innerText = game.score;
            // // show the time in the time div (div with id: time)
            // timeElement.innerText = game.time;

        } else {
          // sync the UI - show the time inside the time div (div with id: time)
            // const timerElement = document.getElementById('time');
           // update the game state
           game.time -= 1;
           timeElement.innerText = game.time;  
        }


    }, 1000);
    moleAppear();


}

/* 
  initialize the game, reset all the values to the starting point
  and show the mole with the class start so we can start the game
*/

function resetGame() {
    // game.score = 0;
    game.time = 15;
    game.gameOver = true;
    timeElement.innerText = game.time;
    scoreElement.innerText = game.score;

    // if(game.score === 10) {
    // game.gameOver = true;
    // document.getElementById('mole').classList.remove('up');
    // document.getElementById('mole').classList.remove('hit');
    // }
    // document.getElementsByClassName('hole').classList.add('start');



    // The first 'hole' should have the class 'start'
    // and when it clicked - it should call start game function



    // document.getElementById('hole').classList.add('start');
    // document.getElementById('hole').addEventListener('click', startGame);
    // document.getElementById('hole').classList.remove('start');

    holesElements[2].classList.add('start');
    holesElements[2].addEventListener('click', startGame);
    


    // document.getElementsByClassName('hole').classList.remove('start');
}

    // attach the function whack() to all divs with the class 'hole'
    for (let i = 0; i < holesElements.length; i++) {
        holesElements[i].addEventListener('click', whack);
    }

resetGame();
