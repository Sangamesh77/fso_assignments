import { useState } from 'react'

const getRandomInteger = (maxValue) => {
  return Math.floor(Math.random() * maxValue)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteList, setVoteList] = useState(Array(anecdotes.length + 2).fill(0)) //Using the last - 1 index of the array to save the index of the most voted anecdote and last index to save max votes
  
  const getRandomAnecdote = () => {
    const newIndex = getRandomInteger(anecdotes.length)
    setSelected(newIndex)
    console.log("Selecting Anecdote ", newIndex)
  }

  const voteAnecdote = () => {
    const newVoteList = [...voteList]
    newVoteList[selected] += 1
    let requiredSlice = newVoteList.slice(0, newVoteList.length - 2)
    console.log("Actual votes list: ", requiredSlice)
    newVoteList[newVoteList.length - 1] = Math.max(...requiredSlice)
    newVoteList[newVoteList.length - 2] = requiredSlice.indexOf(newVoteList[newVoteList.length - 1])
    setVoteList(newVoteList) 
    console.log("new vote list: ", newVoteList)
    console.log("Most voted index: ", newVoteList[newVoteList.length - 2])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p>has {voteList[selected]} votes</p>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={getRandomAnecdote}>next anecdote</button>
      <br/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[voteList[voteList.length - 2]]}
      <p>has {voteList[voteList.length - 1]} votes</p>
    </div>
  )
}

export default App
