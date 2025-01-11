import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (tokenToSet) => {
  token = `Bearer ${tokenToSet}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.get('http://localhost:3001/api/blogs', config)
    return response.data
  }
  catch(exception){
    console.log('Exception:', exception)
  }
}

const createOne = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post('http://localhost:3001/api/blogs', blog, config)
    return response.data
  }
  catch(exception){
    console.log('Exception:', exception)
  }
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    blog.hasOwnProperty('user') ? delete blog.user : null
    console.log('Blog: ', blog)
    const response = await axios.put(`http://localhost:3001/api/blogs/${blog.id}`, blog, config)
    return response.data
  }
  catch(exception){
    console.log('Exception:', exception)
  }
}

export default { getAll, setToken, createOne, updateBlog }