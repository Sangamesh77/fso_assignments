import { useState } from 'react'
import blogService from '../services/blogs'

const CreateNewBlog = ({ blogs, setBlogs, createHandler }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = async (event) => {
    event.preventDefault()
    try{
      const newBlog = await blogService.createOne({
        title, author, url
      })
      console.log('Response: ', newBlog)
      setBlogs([...blogs, newBlog])
      createHandler(newBlog)
    }
    catch(exception){
      console.log('Exception in create new blog:', exception)
    }
  }

  return(
    <form onSubmit={handleCreateNew}>
      <h2>create new</h2>
      <div>
                title:
        <input
          value={title}
          type='text'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
                author:
        <input
          value={author}
          type='text'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
                url:
        <input
          value={url}
          type='text'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default CreateNewBlog