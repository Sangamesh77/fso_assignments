import { NumExercises } from "../assets/numbers"

const Total = () => {
    var exercisesSum = NumExercises.reduce(
        (a, b) => {
            return a + b
        }
    )
    return (
        <h2>&emsp;Total exercises in here: {exercisesSum}</h2>
    )
}

export default Total