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


// function to determine who will choose the number and who will guess
async function whoStarts() {
  player =  await ask("Who do you want to guess? You or the Computer? Enter me/computer\n ")
  console.log("Ok. Loading game...")
  if (player.toLowerCase() == "computer"){
    setTimeout(() => {
    start_computer()
  }, 2000);
  }

  else if (player.toLowerCase() == "me"){
    {
      setTimeout(() => {
      start_user()
    }, 2000);
  }
  }
  else{
    console.log("invalid input")
    whoStarts()
  }
  }
  

// smart guesser that returns the median of the lower and upper limit
  async function compGuesser(min, max){
    compGuess = Math.round((max + min) /2 )
    guesses.push(compGuess)
  }
  
  
  // computer guesses
async function start_computer() {
  let trys = 7
 
  console.log(`Let's play a game where you (human) make up a number between two numbers and I (computer) try to guess it. I wil have ${trys} trys.`)

  let lowBarrier = await ask ("What do you want the low barrier to be? Inert numbers only!: ")
  let lowBarrierNum = Number(lowBarrier)

  let highBarrier = await ask ("What do you want the high barrier to be? Insert numbers only!: ")
  let highBarrierNum = Number(highBarrier)


  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

  console.log('You entered: ' + secretNumber);

  // check if all requirements are numbers to start the game,  
  if (isNaN(lowBarrier) == true || isNaN(highBarrier) == true || isNaN(secretNumber)== true || lowBarrierNum > highBarrier){
    console.log("Sorry invalid input... you must start again")
    whoStarts()
   }
else{
  // first guess is random between the limits, later will be the median
  let firstGuess = Math.round(Math.random()*  (highBarrierNum- lowBarrierNum) + lowBarrierNum)
  firstGuessNum = Number(firstGuess)
  guesses.push(firstGuessNum)

  let firstGuessQuestion = await ask(`my first guess... is it ${firstGuessNum}? `) 

  if (firstGuessQuestion == "yes"){
    console.log("Nice I won on the first try!")
  }

else if (firstGuessQuestion == "no"){
    trys -= 1
    console.log(`I have ${trys} trys left`)

// while loop initiated after first guess is wrong. First requirement is to check that computer still has trys
    while(trys>=0){
      if (trys == 0){
        playAGain = await ask("I am out of trys... Click y to play again or any key to exit:  ")
        if (playAGain.toLowerCase()== "y"){
          whoStarts()}
          else{
          process.exit()
          }
      }

      let highOrLow = await ask("is it higher or lower? h/l: ")

// make guess lower limit by acquiring it from  guess array
      if (highOrLow.toLowerCase() == "h"){
        lowBarrierNum = guesses[(guesses.length) - 1]        
      }
      else if(highOrLow .toLowerCase()== "l"){
        highBarrierNum = guesses[(guesses.length) - 1]
       
      }
// continue back to beginning of loop to check if h/l again, unlimited trys
      else {
      console.log("Invalid input")
      continue}      

// create new median from limits and check again the secret number 
      compGuesser(lowBarrierNum ,highBarrierNum)
      console.log(lowBarrierNum, highBarrierNum)
      let answer =  await ask(`Is the value ${compGuess}? `)

// if won, asked to play again
       if (answer.toLowerCase() == "yes"){
          playAGain = await ask("Nice I won! Want to play again? Click y to play again or any key to exit:  ")
            if (playAGain.toLowerCase()== "y"){
            whoStarts()}
            else{
            process.exit()
            }
          }
// if wrong, lost one try and brought back to beginning of loop        
      else if (answer.toLowerCase() == "no"){
        trys -= 1
            console.log(`I have ${trys} trys left`)
      }
// invalid input limited to two wrong inputs
      else{
          console.log(`Invalid input... `)
           answer =  await ask(`Is the value ${compGuess}? `)
          if (answer.toLowerCase() == "yes"){
            playAGain = await ask("Nice I won! Want to play again? Click y to play again or any key to exit:  ")
              if (playAGain.toLowerCase()== "y"){
              whoStarts()}
              else{
              process.exit()
              }
            }
          else if (answer.toLowerCase() =="no"){
            trys -= 1
            console.log(`you have ${trys} trys left`)
          }

          else {
            console.log("you had to many typos... game over")
            process.exit()
          }
        }
        }
        }
        }
        }


        async function start_user() {

          console.log(`Let's play a game where I (computer) make up a number between two numbers and you (human) try to guess it.`)
  
        }
        
      

    whoStarts()