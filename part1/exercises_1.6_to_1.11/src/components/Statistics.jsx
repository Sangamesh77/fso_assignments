import StatisticLine from "./StatisticLine"

const Statistics = ({good, neutral, bad}) => {
    let total = good + neutral + bad
    let average = 0
    if(total == 0){
        return(
            <p>No Feedback given</p>
        )
    }
    average = (good - bad) / total 
    let positive = (good / total) * 100
    return (
        <table>
            <tbody>
                <StatisticLine text={"good"} value={good}/>
                <StatisticLine text={"neutral"} value={neutral}/>
                <StatisticLine text={"bad"} value={bad}/>
                <StatisticLine text={"all"} value={total}/>
                <StatisticLine text={"average"} value={average} roundOff={true}/>
                <StatisticLine text={"positive"} value={positive} roundOff={true} unit="%"/>
            </tbody>
        </table>
    )
}

export default Statistics