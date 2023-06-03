const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText)  {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}


// create a while loop that allows guesses for the computer
// create a computer guess between 1 and 100
// create a input response if correct, higher or lower
// 
// create a function that takes in a min and max based on your answer of Higher or lower
// have that function always return the medium as the guess
// 

// QUESTIONS WHAT IF I DONT USE AWAIT AND DOES FUNCTION FOR GUESS PARAMETERS HAVE TO AWAIT

let compGuessRounded
mins = [1, ]
maxs = [100, ]

async function compGuessParameters (min , max){
  compGuessRounded = Math.round((max + min )/ 2)
  guesses.push(compGuessRounded)
  console.log(min , max)
  
}

guesses = []
let gameIsOn = true

async function start() {
  console.log("Let's play a game where you (human) make up a number between 1 and 100 and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

    compGuessParameters(1, 100)

  while (gameIsOn){
     let answer = await ask(`is the number ${compGuessRounded}? `)    

    if (answer == "no".toLowerCase()){
      higherOrLower = await ask("is it higher or lower? h/l: ")
        if (higherOrLower =="h".toLowerCase()){
          mins.push(compGuessRounded)
          compGuessParameters(compGuessRounded, maxs[maxs.length-1])
        }

        else if (higherOrLower =="l".toLowerCase()){
          maxs.push(compGuessRounded)
          compGuessParameters(mins[mins.length-1], compGuessRounded)
        }

        else{
          await ask("you entered an invalid option please try again.")
        }
      }

      else{
        gameIsOn= false
        console.log("game over")
        
      }
    }

  }














start ();