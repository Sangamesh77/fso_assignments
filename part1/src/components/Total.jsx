import { ExerciseNums } from "../Assets/Constants"

const Total = () => {
    return (
        <p>Number of exercises = {ExerciseNums.exercises1 + ExerciseNums.exercises2 + ExerciseNums.exercises3}</p>
    )
}

export default Total