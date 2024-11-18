import Part from "./Part"

const Course = ({ course }) => {
    const {name, parts} = course
    const exercisesSum = parts.reduce(
        (exercisesCounter, part) => exercisesCounter + part.exercises, 0
    )
    return(
        <div>
            <h2>{name}</h2>
            {parts.map(
        partItem => <Part key={partItem.id} part={partItem}/>
    )}
            <p><b>Total of {exercisesSum} exercises</b></p>
        </div>

    )
}

export default Course