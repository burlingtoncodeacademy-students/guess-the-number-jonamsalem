const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText)  {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

 // declaring variables for global scope
let firstGuessNum
let compGuess
let guesses = []


async function start_user() {
  let trys = 7

  console.log(`Let's play a game where I (computer) make up a number between two numbers and you (human) try to guess it.`)

// set up lower and higher limits for the game
  let lowBarrier = await ask ("What do you want the low barrier to be? Inert numbers only!: ")
  let lowBarrierNum = Number(lowBarrier)

  let highBarrier = await ask ("What do you want the high barrier to be? Insert numbers only!: ")
  let highBarrierNum = Number(highBarrier)

// invalid inputs lead to to restart of the game
if (isNaN(lowBarrier) == true || isNaN(highBarrier) == true || lowBarrierNum >= highBarrier){
  console.log("Sorry invalid input...The game is over.")
  process.exit()
  }

// create random number between two limits
  let secretNumber = Math.round(Math.random()* (highBarrierNum - lowBarrierNum) + lowBarrierNum);
  console.log("Ok I thought of a secret number...")



// loop through game until correct or guesses done  
    while (trys > 0 ){
        userGuess = await ask("\nWhat do you think the number is? ")
        trys -= 1

// if user input is not a number or out of limits break from loop
        if (isNaN(userGuess) == true || userGuess < lowBarrierNum || userGuess > highBarrierNum ){
          console.log("invalid input, your input is not within the range of the number limits")
          break
        }

// if user input is correct break out of loop
        else if (userGuess == secretNumber){
          console.log(`Nice you won in ${7-trys} try/s`)
          break
        }

// if user input is wrong computer logs higher or lower and restarts loop         
        else{
          console.log(`Nope.You have ${trys} try/s left`)
          if (trys ==0){
            console.log(`You are our of trys. My number was ${secretNumber}`)
          }
          else if (userGuess < secretNumber){
            console.log("My number is higher than that\n ")
          }

          else if (userGuess> secretNumber){
            console.log("my number is lower than that\n")
          }

// user input not in range of limits or NaN
          else{
            console.log("Invalid input...\n")
            continue
          }
          }
          }
// asked to play again after while loop        
  playAGain = await ask(`Want to play again? Click y to play again or any key to exit: `)
      if (playAGain.toLowerCase().trim()== "y"){
      start_user()}
      else{
      process.exit()
      }
      }

start_user()