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
  const response = await axios.get("http://localhost:3001/api/blogs", config)
  return response.data
  }
  catch(exception){
    console.log("Exception:", exception)
  }
}

export default { getAll, setToken }