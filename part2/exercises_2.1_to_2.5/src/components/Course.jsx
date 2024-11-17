import Parts from "./Parts"

const Course = ({ course }) => {
    const {name, parts} = course
    const exercisesSum = parts.reduce(
        (exercisesCounter, part) => exercisesCounter + part.exercises, 0
    )

    return(
        <div>
            <h2>{name}</h2>
            <Parts partsList={parts}/>
            <p><b>Total of {exercisesSum} exercises</b></p>
        </div>

    )
}

export default Course