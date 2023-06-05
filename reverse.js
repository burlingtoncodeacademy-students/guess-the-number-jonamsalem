async function start_user() {

    console.log(`Let's play a game where I (computer) make up a number between two numbers and you (human) try to guess it.`)
  
    let lowBarrier = await ask ("What do you want the low barrier to be? Inert numbers only!: ")
    let lowBarrierNum = Number(lowBarrier)
  
    let highBarrier = await ask ("What do you want the high barrier to be? Insert numbers only!: ")
    let highBarrierNum = Number(highBarrier)

    console.log("I am thinking of a secret number...")
  
    let secretNumber = Math.round(Math.random()* (highBarrierNum - lowBarrierNum) + lowBarrierNum);
    console.log(secretNumber)

    if (isNaN(lowBarrier) == false && isNaN(highBarrier) == false && isNaN(secretNumber)== false){
  
      while (trys > 0 ){

        userGuess = await ask("What do you think the number is? ")
  
        if (userGuess == secretNumber){
          playAGain =  await ask("Nice you won! Want to play again? y/n: ")
          if (playAGain.toLowerCase() == "y"){
            whoStarts()}
          else{
            process.exit()
        }
        }

        else if (isNaN(userGuess) == true){
            console.log(`Invalid input... `)
          }

       else {
        trys-=1
        if (trys == 0){
          playAGain =  await ask("You lose. Want to play again? y/n: ")
          if (playAGain.toLowerCase() == "yes"){
            whoStarts()}
          else{
            process.exit()
        }
        }
        else{
        console.log(`Nope.You have ${trys} trys left`)
        if (userGuess < secretNumber){
          console.log("My number is higher than that ")
       }
       else{
        console.log("my number is lower than that")
       }}
      

  
    }
    }  
  }
  
    else {
      console.log("You didn't enter a number for one of the values. You must start over\nLoading...\n\n ")
      setTimeout(() => {
        whoStarts()
      }, 2000);
    }
  
}

export {start_user};