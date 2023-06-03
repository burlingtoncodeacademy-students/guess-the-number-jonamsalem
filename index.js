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


async function start() {
  let lowBarrier = await ask ("What do you want the low barrier to be? Inert numbers only! ")
  let lowBarrierNum = Number(lowBarrier)
  let highBarrier = await ask ("What do you want the high barrier to be? Insert numbers only! ")
  let highBarrierNum = Number(highBarrier)


  guesses = []

  
let compGuessRounded


mins = [lowBarrierNum, ]
maxs = [highBarrierNum, ]
 
async function compGuessParameters (min , max){
  compGuessRounded = Math.round((max + min )/ 2)
  console.log(compGuessRounded)
  guesses.push(compGuessRounded)
  console.log(min, max)
  
}


let gameIsOn = true
  console.log(`Let's play a game where you (human) make up a number between ${lowBarrierNum} and ${highBarrierNum} and I (computer) try to guess it.`)
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
    let firstNumber = Math.round((Math.random()*(highBarrierNum - lowBarrierNum) + lowBarrierNum))
    compGuessRounded = firstNumber
    let answer = await ask(`is the number ${firstNumber}? `) 

    if (answer == "yes".toLowerCase()){
      console.log("I won in the first try!!")
    }
    else {
    while (gameIsOn){
      if (answer == "no".toLowerCase()){

        higherOrLower = await ask("is it higher or lower? h/l: ")

          if (higherOrLower =="h".toLowerCase()){
            compGuessParameters(compGuessRounded, maxs[maxs.length-1])
            answer = await ask(`is the number ${compGuessRounded}? `)    

          }

          else if (higherOrLower =="l".toLowerCase()){
            maxs.push(compGuessRounded)
            console.log(mins,maxs)
            compGuessParameters(mins[mins.length-1], compGuessRounded)
            answer = await ask(`is the number ${compGuessRounded}? `)    

          }

          else{
            await ask("you entered an invalid option please try again.")
          }
        }

        else if(answer == "yes"){
          gameIsOn= false
          console.log("game over")
        }
      
          
        else {
          console.log("Invalid input try again")
        } 
        }
      

  
  







      
      }}





start ();