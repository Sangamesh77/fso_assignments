import { useEffect, useState } from 'react'
import Togglable from './Togglable'
import BlogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [likes, setLikes] = useState(blog.likes)

  const likeHandler = async () => {
    try{
      await BlogService.updateBlog({ ...blog, likes: likes + 1 })
      setLikes(likes + 1)
    } catch(exception){
      console.log('Exception liking blog:', exception)
    }
  }

  return(<div>
    {blog.title}
    <Togglable buttonLabel='view'>
      {blog.url}
      likes {likes}
      <button onClick={likeHandler}>like</button>
      {blog.author}
    </Togglable>
  </div> )
}

export default Blog