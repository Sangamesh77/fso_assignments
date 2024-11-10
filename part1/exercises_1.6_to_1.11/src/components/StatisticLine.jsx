const StatisticLine = ({text, value, roundOff=false, unit=""}) => {
    let displayValue = value
    if(roundOff){
        displayValue = value.toFixed(1)
    }
    return(
        <tr>
            <td>{text}</td>
            <td>{displayValue} {unit}</td>
        </tr>
    )
}

export default StatisticLine