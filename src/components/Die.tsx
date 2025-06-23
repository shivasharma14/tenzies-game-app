export default function Die(props:any){
    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <button 
        style={styles}
        onClick= {()=>{props.holdDice(props.id)}}
        aria-pressed={props.isHeld}
        aria-label = {`Die with value ${props.value}, ${props.isHeld ? "is held" : "is not held"}`}>
            {props.value}</button>
    )
}