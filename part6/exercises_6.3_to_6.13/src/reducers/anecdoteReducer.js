import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type){
//     case 'CREATE_ANECDOTE':
//       return state.concat(asObject(action.payload.anecdote))
//     case 'VOTE_ANECDOTE':{
//       const updatedAnecdotes = state.map((anecdote) => {
//         return anecdote.id === action.payload.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
//       })
//       return updatedAnecdotes.sort((prev, next) => {
//         return prev.votes < next.votes
//       })
//     }
//   }

//   return state
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action){
      console.log("Create payload: ", action.payload)
      return state.concat(asObject(action.payload))
    },
    voteAnecdote(state, action){
      console.log("payload id:", action.payload)
      const updatedAnecdotes = state.map((anecdote) => {
        return anecdote.id === action.payload ? {...anecdote, votes: anecdote.votes + 1} : anecdote
      })
      return updatedAnecdotes.sort((prev, next) => {
        return prev.votes < next.votes
      })
    }
  }
})

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer