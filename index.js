const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText)  {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

 // declaring variables for global scope
let firstGuessNum
let trys 
let secretNumber
let compGuess
let guesses = []


// function to choose player
async function whoStarts() {
  trys = 7
  player =  await ask("Who do you want to guess? You or the Computer? Enter me/computer\n ")
  console.log("Ok. Loading game...")
    if (player.toLowerCase().trim() == "computer"){
      setTimeout(() => {
      start_computer()
    }, 2000);
    }

    else if (player.toLowerCase().trim() == "me"){
      {
        setTimeout(() => {
        start_user()
      }, 2000);
    }}

    else{
      console.log("invalid input")
      whoStarts()
    }}
  

// smart guesser that returns the median of the lower and upper limit.
  async function compGuesser(min, max){
    compGuess = Math.round((max + min) /2 )
    guesses.push(compGuess)
  }
  
// computer guesses
async function start_computer() {

  console.log(`Let's play a game where you (human) make up a number between two numbers and I (computer) try to guess it. I wil have ${trys} trys.`)

  // set up low and high limits for the game
  let lowBarrier = await ask ("What do you want the low barrier to be? Inert numbers only!: ")
  let lowBarrierNum = Number(lowBarrier)

  let highBarrier = await ask ("What do you want the high barrier to be? Insert numbers only!: ")
  let highBarrierNum = Number(highBarrier)


  secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

  console.log('You entered: ' + secretNumber);

  // check if all requirements are numbers to start the game,  
  if (isNaN(lowBarrier) == true || isNaN(highBarrier) == true || isNaN(secretNumber)== true || lowBarrierNum >= highBarrier){
    console.log("Sorry invalid input... you must start again\n")
    whoStarts()
   }

  // first guess is random between the limits, rest is median. All guesses pushed to guess array for later use
  let firstGuess = Math.round(Math.random()*  (highBarrierNum- lowBarrierNum) + lowBarrierNum)
  firstGuessNum = Number(firstGuess)
  guesses.push(firstGuessNum)

  let firstGuessQuestion = await ask(`my first guess... is it ${firstGuessNum}? `) 

  // if first guess is correct end game and asked to play again
  if (firstGuessQuestion.toLowerCase().trim() == "yes"){
        playAGain = await ask("Nice I won on my first try. Want to play again? Click y to play again or any key to exit: ")
        if (playAGain.toLowerCase().trim()== "y"){
          whoStarts()}
          else{
          process.exit()
          }
          }
// if furst guess wrong while loop initiated
  else if (firstGuessQuestion.toLowerCase().trim() == "no"){
      trys -= 1
      console.log(`I have ${trys} try/s left`)

      while(trys > 0 ){
          let highOrLow = await ask("is your number higher or lower? h/l: ")
        
// cheat detector checks if player lies about whether the guess is higher or lower
          if (compGuess > secretNumber && highOrLow == "h" || compGuess < secretNumber && highOrLow == "l" ){
            console.log('You are cheating!!Game over!')
            process.exit()
          }

    // make last guess the lower limit by acquiring it from guess array
          if (highOrLow.toLowerCase().trim() == "h"){
            lowBarrierNum = guesses[(guesses.length) - 1]        
          }
    // make last guess higher limit by acquiring it from guess array
          else if(highOrLow .toLowerCase().trim()== "l"){
            highBarrierNum = guesses[(guesses.length) - 1]
          }
    // goes loop to check if h/l again, unlimited trys
          else {
          console.log("Invalid input")
          continue
        }      

    // create new median from limits and check against the secret number 
          compGuesser(lowBarrierNum ,highBarrierNum)
          console.log(`My limits are ${lowBarrierNum} and ${highBarrierNum}`)
          let answer =  await ask(`\nIs the value ${compGuess}? `)

    // cheat detector checks if guess is correct yet answer is no
          if (compGuess == secretNumber && answer == "no"){
              console.log('You are cheating!!Game over!')
              process.exit()
          }
      

    // if guess is correct,breaks from loop
          if (answer.toLowerCase() == "yes"){
            trys -= 1
            console.log(`Nice I won in ${7-trys} trys`)
            break
          }
              
    // if wrong, restarts loop until trys done
          else if (answer.toLowerCase().trim() == "no"){
            trys -= 1
                console.log(`I have ${trys} try/s left`)
          }
    // invalid input breaks from loop
          else{
              console.log(`Invalid input... `)
              break 
              }
            }
// ----------------End of while loop --------------
            
    // After exit while loop, asked to play again
        playAGain = await ask("The game is over... Click y to play again or any key to exit:  ")
        if (playAGain.toLowerCase().trim()== "y"){
          whoStarts()
        }
        else{
          process.exit()
          }
          }

// if first guess was invalid input
else{
  console.log(`Invalid input... `)
  playAGain = await ask(`Want to play again? Click y to play again or any key to exit:  `)
  if (playAGain.toLowerCase().trim()== "y"){
  whoStarts()}
  else{
  process.exit()
  }
  }
  }
  
        

// user guesses
async function start_user() {

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
    console.log(secretNumber)
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

// user input not in rangle of limits or NaN
            else{
              console.log("Invalid input...\n")
              continue
            }
            }
            }
// asked to play again after while loop        
    playAGain = await ask(`Want to play again? Click y to play again or any key to exit: `)
        if (playAGain.toLowerCase().trim()== "y"){
        whoStarts()}
        else{
        process.exit()
        }
        }

whoStarts()