import { useQueryClient, useMutation,  } from "@tanstack/react-query"
import anecdotesService from '../services/anecdotes'
import { useNotificationDispatch } from "../state/NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const createAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      //queryClient.invalidateQueries('anecdotes')
    },
    onError: error => {
      const errorMessage = error.response.data.error
      console.log("Error:", errorMessage)
      notificationDispatch({
        type: 'SET',
        payload: errorMessage
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'RESET'
        })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({content})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
