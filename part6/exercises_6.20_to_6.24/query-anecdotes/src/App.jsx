import { useQuery, useMutation, useQueryClient, queryOptions, QueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { useNotificationDispatch } from './state/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.voteAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log("Anecdote filtered:", anecdotes.filter(anecdote => anecdote.id !== updatedAnecdote.id).concat(updatedAnecdote))
      queryClient.setQueryData(['anecdotes'], anecdotes.filter(anecdote => anecdote.id !== updatedAnecdote.id).concat(updatedAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    console.log('anecdote:',anecdote)
    notificationDispatch({
      type: 'SET',
      payload: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      notificationDispatch({
        type: 'RESET'
      })
    }, 5000)

  }

  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAnecdotes
  })

  if(result.isLoading){
    return(
      <div>Loading, please wait...</div>
    )
  }
  else if(result.isError){
    return(
      <div>anecdote service is not available due to problems in server</div>
    )
  }
  else{
    const anecdotes = result.data
    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
