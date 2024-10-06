import { NumExercises } from "../assets/numbers"
import { PartNames } from "../assets/strings"
import Part from "./Part"

const Content = () => {

    var partsList = new Array()
    for(let index=0; index<PartNames.length; index++) {
        partsList[index] = <Part key={index} name={PartNames[index]} exercises={NumExercises[index]}/>
    }
    return partsList
}

export default Content