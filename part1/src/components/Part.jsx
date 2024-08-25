const Part = (props) => {
    const {partName, exerciseName} = props
    return(
    <p>
        {partName} {exerciseName}
    </p>
    )
}

export default Part