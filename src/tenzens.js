
export default function Die(props){
   
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
      }
     
        return (
            <div className="boxes" onClick={props.holdDice} style={style}>
                  <h3 >{props.value}</h3>
            </div>
        )
}