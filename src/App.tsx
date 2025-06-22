import Die from "./components/Die"
import { useState } from "react"

export default function App(){
  const [dice, setDice] = useState(generateAllNewDice())
  function generateAllNewDice(){
    // const newDice = []
    // for(let i=0;i<10;i++){
    //   const rand = Math.ceil(Math.random()*6)
    //   newDice.push(rand)
    // }
    // return newDice

    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6))

  }
const diceElements = dice.map(num => <Die value = {num}/>)

  return(
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
    </main>
  )
}