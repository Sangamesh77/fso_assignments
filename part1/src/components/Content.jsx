import Part from "./Part"
import { PartStrings, ExerciseNums } from "../Assets/Constants"
import Header from "./Header"

const Content = () => {
    
    return(
        <>
            <Part partName={PartStrings.part1} exerciseName={ExerciseNums.exercises1}/>
            <Part partName={PartStrings.part2} exerciseName={ExerciseNums.exercises2}/>
            <Part partName={PartStrings.part3} exerciseName={ExerciseNums.exercises3}/>
        </>
    )
}

export default Content