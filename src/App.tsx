import Die from "./components/Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // const [dice, setDice] = useState(generateAllNewDice()); this will call the genrateAllNewDice function again and agian whenever the state gets changed
  const [dice, setDice] = useState(()=>generateAllNewDice());
  const buttonRef = useRef<any>(null)
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value == dice[0].value);

   useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus()
    }
   },[gameWon]) 

  function generateAllNewDice() {
    // const newDice = []
    // for(let i=0;i<10;i++){
    //   const rand = Math.ceil(Math.random()*6)
    //   newDice.push(rand)
    // }
    // return newDice

    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if(!gameWon){
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
    else{
      setDice(generateAllNewDice())
    }
  }

  function holdDice(id: string) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id == id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      holdDice={holdDice}
      id={dieObj.id}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You Won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all the dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
