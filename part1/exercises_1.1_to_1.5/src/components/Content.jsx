// import { NumExercises } from "../assets/numbers"
// import { PartNames } from "../assets/strings"
import Part from "./Part"

const Content = (props) => {
    const {parts} = props
    for(let index=0; index<parts.length; index++) {
        parts[index] = <Part key={index} name={parts[index].name} exercises={parts[index].exercises}/>
    }
    return parts
}

export default Content