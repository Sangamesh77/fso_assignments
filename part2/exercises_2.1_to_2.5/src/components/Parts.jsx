const Parts = ({ partsList }) => {
    return(
        partsList.map(
            (partItem) => <p key={partItem.id}>{partItem.name} {partItem.exercises}</p>
        )
    )
}

export default Parts