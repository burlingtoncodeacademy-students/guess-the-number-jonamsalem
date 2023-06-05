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
          console.log(`Invalid input... `)
          process.exit()
        }

        else if (userGuess == secretNumber){
          playAGain =  await ask(`Nice you won in ${7-trys}! try/s Want to play again? y/n:` )
          if (playAGain.toLowerCase() == "y"){
            whoStarts()}
          else{
            process.exit()
        }
        }
        else{
        console.log(`Nope.You have ${trys} try/s left`)
            if (userGuess < secretNumber){
              console.log("My number is higher than that ")
              }


            else if (userGuess> secretNumber)
            {
              console.log("my number is lower than that")
            }

            else{
              console.log("Invalid input...")
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
export {start_user};