import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"


const AnecdoteFilter = () => {

    const dispatch = useDispatch()

    const applyFilter = (event) => {
        dispatch(setFilter(event.target.value))
    }
    return(
        <div>
            filter
            <input name='filter' onChange={applyFilter}></input>
        </div>
    )
}

export default AnecdoteFilter