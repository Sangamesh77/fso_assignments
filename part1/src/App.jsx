import { CourseName } from "./assets/strings"
import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

const App = () => {
  //Const definitions are in assets

  return (
    <div>
      <Header name={CourseName}/>
      <br/>
      <Content/>
      <br/>
      <Total/>
    </div>
  )
}

export default App