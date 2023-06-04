const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText)  {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let compGuess
guesses = []

async function compGuesser(min, max){
  compGuess = Math.round((max + min) /2 )

}

async function start() {
  gameIsOn = true

  console.log(`Let's play a game where you (human) make up a number between two numbers and I (computer) try to guess it.`)

  let lowBarrier = await ask ("What do you want the low barrier to be? Inert numbers only! ")
  let lowBarrierNum = Number(lowBarrier)

  let highBarrier = await ask ("What do you want the high barrier to be? Insert numbers only! ")
  let highBarrierNum = Number(highBarrier)


  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  while (gameIsOn){
    compGuesser(lowBarrierNum ,highBarrierNum)
    answer =  await ask(`is the value ${compGuess}`)


    if (answer =="no"){
      let highOrLow = await ask("is it higher or lower? h/l: ")
        if (highOrLow == "h"){
          lowBarrierNum = compGuess
        }
        else if (highOrLow == "l"){
          highBarrierNum =  compGuess
        }

        else {
         console.log("Invalid input.")
         
        
    }
  }
    else if (answer == "yes"){
      console.log("I won")
      process.exit()

    }

    else {
      console.log("invalid input")
     
  }


}

}





start()


















//     let firstNumber = Math.round((Math.random()*(highBarrierNum - lowBarrierNum) + lowBarrierNum))
//     compGuessRounded = firstNumber
//     let firstAnswer = await ask(`is the number ${firstNumber}? `) 
//     let answer = await ask(`is the answer ${compGuessRounded}`)

//     if (firstAnswer == "yes".toLowerCase()){
//         console.log("I won in the first try!!")
//         process.exit()}
    
//     else if (firstAnswer != "no"){
//       console.log("Invalid answer try again")
//       Firstanswer = await ask(`is the number ${firstNumber}? `) 

//       }
//       else {
//       while (gameIsOn){
//         if (answer == "no".toLowerCase()){

//           higherOrLower = await ask("is it higher or lower? h/l: ")

//             if (higherOrLower =="h".toLowerCase()){
//               GuessParameters(compGuessRounded, maxs[maxs.length-1])
//               answer = await ask(`is the number ${compGuessRounded}? `)    

//             }

//             else if (higherOrLower =="l".toLowerCase()){
//               maxs.push(compGuessRounded)
//               console.log(mins,maxs)
//               GuessParameters(mins[mins.length-1], compGuessRounded)
//               answer = await ask(`is the number ${compGuessRounded}? `)    

//             }

//             else{
//               console.log("Invalid input try again.")
//               answer = await ask(`is the number ${compGuessRounded}? `)    

//             }
//           }

//           else if(answer == "yes"){
//             gameIsOn= false
//             console.log("Wow game over")
//             process.exit()
//           }
        
            
//           else {
//             console.log("Invalid input try again.")
//             let answer = await ask(`is the number ${firstNumber}? `) 

//           } 
//           }
        

    
    







      
//       }}





// start ();