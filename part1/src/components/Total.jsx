// import { NumExercises } from "../assets/numbers"

const Total = (props) => {
    const {parts} = props
    let exercisesSum = parts.reduce((acc, obj) => {
        console.log(typeof(obj))
        return (acc + obj.props.exercises)
    }, 0
)
    console.log(exercisesSum)
    return (
        <h2>&emsp;Total exercises in here: {exercisesSum}</h2>
    )
}

export default Total