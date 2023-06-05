const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText)  {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

 // declaring variables for global scope
let firstGuessNum
let trys = 7
let compGuess
let guesses = []


// function to determine who will choose the number and who will guess
async function whoStarts() {
  player =  await ask("Who do you want to guess? You or the Computer? Enter me/computer\n ")
  console.log("Ok. Loading game...")
    if (player.toLowerCase().trim() == "computer"){
      setTimeout(() => {
      start_computer()
    }, 2000);
    }

    else if (player.toLowerCase() == "me"){
      {
        setTimeout(() => {
        start_user()
      }, 2000);
    }}

    else{
      console.log("invalid input")
      whoStarts()
    }}
  

// smart guesser that returns the median of the lower and upper limit
  async function compGuesser(min, max){
    compGuess = Math.round((max + min) /2 )
    guesses.push(compGuess)
  }
  
  
// computer guesses
async function start_computer() {

 
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

  // first guess is random between the limits, later will be the median
  let firstGuess = Math.round(Math.random()*  (highBarrierNum- lowBarrierNum) + lowBarrierNum)
  firstGuessNum = Number(firstGuess)
  guesses.push(firstGuessNum)

  let firstGuessQuestion = await ask(`my first guess... is it ${firstGuessNum}? `) 

  if (firstGuessQuestion.toLowerCase().trim() == "yes"){
        playAGain = await ask("Nice I won on my first try. Want to play again? Click y to play again or any key to exit: ")
        if (playAGain.toLowerCase().trim()== "y"){
          whoStarts()}
          else{
          process.exit()
          }
          }

  else if (firstGuessQuestion.toLowerCase().trim() == "no"){
      trys -= 1
      console.log(`I have ${trys} try/s left`)

// while loop initiated after first guess is wrong. First requirement is to check that computer still has trys
      while(trys>=0){
        let highOrLow = await ask("is it higher or lower? h/l: ")
      
 //   cheat detector  
        if (lowBarrierNum > highBarrierNum){
          Console.log("you are cheating!")
          continue
        }

// make guess lower limit by acquiring it from  guess array
      if (highOrLow.toLowerCase().trim() == "h"){
        lowBarrierNum = guesses[(guesses.length) - 1]        
      }
      else if(highOrLow .toLowerCase().trim()== "l"){
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
        trys -= 1
            playAGain = await ask(`Nice I won in ${7-trys} try/s! Want to play again? Click y to play again or any key to exit:  `)
              if (playAGain.toLowerCase().trim()== "y"){
              whoStarts()}
              else{
              process.exit()
              }
              }
// if wrong, lost one try and brought back to beginning of loop        
      else if (answer.toLowerCase().trim() == "no"){
        trys -= 1
            console.log(`I have ${trys} try/s left`)
      }
// invalid input limited to two wrong inputs
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

      if (trys == 0){
        playAGain = await ask("I am out of trys... Click y to play again or any key to exit:  ")
        if (playAGain.toLowerCase().trim()== "y"){
          whoStarts()}
          else{
          process.exit()
          }
          }
          }
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
      
        


  async function start_user() {

      console.log(`Let's play a game where I (computer) make up a number between two numbers and you (human) try to guess it.`)
    
      let lowBarrier = await ask ("What do you want the low barrier to be? Inert numbers only!: ")
      let lowBarrierNum = Number(lowBarrier)
    
      let highBarrier = await ask ("What do you want the high barrier to be? Insert numbers only!: ")
      let highBarrierNum = Number(highBarrier)

      console.log("I am thinking of a secret number...")
    
      let secretNumber = Math.round(Math.random()* (highBarrierNum - lowBarrierNum) + lowBarrierNum);
      console.log(secretNumber)

      if (isNaN(lowBarrier) == true || isNaN(highBarrier) == true || isNaN(secretNumber)== true){
        console.log("You didn't enter a number for one of the values. You must start over\nLoading...\n\n ")
        setTimeout(() => {
          whoStarts()
        }, 2000);
      }
      
        while (trys > 0 ){

          userGuess = await ask("What do you think the number is? ")
          trys -= 1

          if (isNaN(userGuess) == true || userGuess < lowBarrierNum || userGuess > highBarrierNum ){
            playAGain = await ask(`Invalid input... Want to play again? Click y to play again or any key to exit:  `)
            if (playAGain.toLowerCase().trim()== "y"){
            whoStarts()}
            else{
            process.exit()
            }
          }

          else if (userGuess == secretNumber){
            playAGain =  await ask(`Nice you won in ${7-trys} try/s Want to play again? y/n:` )
            if (playAGain.toLowerCase() == "y"){
              whoStarts()}
            else{
              process.exit()
          }
          }
          else{
          console.log(`Nope.You have ${trys} try/s left`)
              if (userGuess < secretNumber){
                console.log("My number is higher than that\n ")
                }


              else if (userGuess> secretNumber)
              {
                console.log("my number is lower than that\n")
              }

              else{
                console.log("Invalid input...\n")
                continue
              }
              }
              }
      if (trys == 0){
        playAGain =  await ask("You are out of trys. Want to play again? y/n: ")
        if (playAGain.toLowerCase() == "yes"){
          whoStarts()}
        else{
          process.exit()
      }
      }
      }

          
      

    whoStarts()