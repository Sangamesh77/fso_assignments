import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    
    const anecdote_state = useSelector(state => state.anecdotes)
    const filter_state = useSelector(state => state.filter)
    const anecdotes = anecdote_state.filter(anecdote => {
      return filter_state === '' ? true : anecdote.content.startsWith(filter_state)
  })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(anecdote.content, 5000))
      }

    return(
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

export default AnecdoteList