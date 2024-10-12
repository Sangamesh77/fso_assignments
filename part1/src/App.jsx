// import { CourseName } from "./assets/strings"
import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

const App = () => {
  //TODO: Const definitions to be in assets
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header name={course}/>
      <br/>
      <Content parts={parts}/>
      <br/>
      <Total parts={parts}/>
    </div>
  )
}

export default App