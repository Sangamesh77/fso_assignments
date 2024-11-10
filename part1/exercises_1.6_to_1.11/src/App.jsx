import { useState } from 'react'
import Heading from './components/Heading'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const createFunction = (category) => {
    let currentValue = 0
    let handler = null
    switch(category) {
      case "good":
        currentValue = good
        handler = setGood
        break
      case "neutral":
        currentValue = neutral
        handler = setNeutral
        break
      case "bad":
        currentValue = bad
        handler = setBad
        break
      default:
        currentValue = neutral
        handler = setNeutral
    } 
    const feedbackClickHandler = () => {
      handler(currentValue + 1)
    }
    return feedbackClickHandler
  }

  return (
    <div>
      <Heading name="give feedback"/>
      <Button onClickAction={createFunction("good")}>good</Button>
      <Button onClickAction={createFunction("neutral")}>neutral</Button>
      <Button onClickAction={createFunction("bad")}>bad</Button>
      <Heading name="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App