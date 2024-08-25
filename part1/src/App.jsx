import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"
import { GenericStrings } from "./assets/Constants"

const App = () => {

  return (
    <div>
      <Header courseName={GenericStrings.course}/>
      <Content/>
      <Total/>
    </div>
  )
}

export default App