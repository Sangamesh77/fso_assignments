import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateNewBlog from './components/CreateNewBlog'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const newNoteRef = useRef()

  const displayBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  useEffect(() => {
    const userStored = window.localStorage.getItem('loggedNoteappUser')
    if(userStored){
      const parsedUser = JSON.parse(userStored)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
      displayBlogs()
    } else {
      console.log('Not executed')
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      console.log('User Token: ', user)
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      displayBlogs()
    }
    catch(exception){
      console.log('Exception: ', exception)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const showNotification = (messageObj) => {
    setErrorMessage(messageObj.message)
    setMessageType(messageObj.type)
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType('error')
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createNewBlogHandler = (blog) => {
    newNoteRef.current.toggleVisibility()
    showNotification({
      message: `a new blog ${blog.title} by ${blog.author} added!`,
      type: 'info'
    })
  }

  return (
    <div>
      <Notification
        message={errorMessage}
        type={messageType}
      />
      {user === null ?
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}/> :
        <>
          <h2>blogs</h2>
          <div>{user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel='New Note' ref={newNoteRef}>
            <CreateNewBlog
              blogs={blogs}
              setBlogs={setBlogs}
              createHandler={createNewBlogHandler}
            />
          </Togglable>
          <br/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>}
    </div>
  )
}

export default App