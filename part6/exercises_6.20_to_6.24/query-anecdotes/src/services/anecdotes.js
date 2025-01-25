import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const createAnecdote = async (content) => {
    const newAnecdote = {
        ...content, votes: 0
    }
    const resp = await axios.post(baseUrl, newAnecdote)
    return resp.data
}

const voteAnecdote = async (anecdote) => {
    const updatedAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
    }
    const resp = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
    console.log("resp:", resp)
    return resp.data
}

export default {
    getAnecdotes,
    createAnecdote,
    voteAnecdote
}