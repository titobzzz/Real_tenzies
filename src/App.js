import React from 'react';
import {nanoid} from "nanoid"
import './App.css';
import Die from "./tenzens"
import Confetti from 'react-confetti'


export default function App () {
    //steps i took
//make an array of of 10 objects with randomrValues 
// create a state to receive the array of objects so we chan implemeent changes whenever we want
//import nanoid to be the generate a random ID for the object the id will be uses as the objects KEY also
//map over the dies array and return a DIE component for all object in the array
// add an isheld boolean propereties to the dies array objects to depects if it is held of not which will inturn affect the styling 
// use the isHeld properties to change the style of the container div
//write a function hold to 1st invert the isHeld properties  and implement it using lazy states
//handle click function that checks if iHeld is fasle then it will produce a new random number value else it will give the old object
// Use useEffect to set a new state properties by connecting two states together
//set the state of tenzies to be true if dies.every.value properties is true

const [dies, setDies] = React.useState(allNewDies())
const [tenzies,setTenzies] = React.useState()

React.useEffect(()=>{
    const isHeld = dies.every(die=>die.isHeld)
    const value = dies.every(die=>die.value)
    if(isHeld && value) {
      setTenzies(true)
      console.log("you Won")
    }else{
      setTenzies(false)
    }

}
,[dies])


function allNewDies(){
  const diesArray=[]
    for(let i =0 ; i < 10 ; i++){
           const randomNumber = Math.floor(Math.random()*7)
       diesArray.push({ value:randomNumber,
              isHeld:false,   
              id : nanoid()
          })
      }
  return diesArray
}

function holdDice (id){
     setDies(oldDies=>oldDies.map(die=> {
      return die.id === id? 
      { ...die,  
        isHeld: !die.isHeld} 
    :die
     }
    ))
}

let die = dies.map(box=>{
  return <Die value={box.value} 
              key={box.id}
               holdDice = {() => holdDice(box.id)}
             isHeld = {box.isHeld}
           /> })
  
     function handleClick(){
      setDies(oldDies=>oldDies.map(die=> {
        const randomNumber = Math.floor(Math.random()*7)
        return !die.isHeld ?  { ...die,
                value: randomNumber }:
                die
       }
      )) 
    }
    

  return (
    <div className="app">
        <main className="main">
        {tenzies && <Confetti/>}
            <div className='text'>              
                <h1 className="title">Tenzies</h1>
                <p className="instructions">{tenzies? "Congrats, You won!": "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
            </div>
          <div className="die-container">
                    {die}
          </div>
         {tenzies && <button classname="button" onClick={() => window.location.reload()}>New Game </button>}
          {!tenzies && <button classname="button" onClick={handleClick}>Roll dies</button>}
        </main>
       </div>
  );
}

