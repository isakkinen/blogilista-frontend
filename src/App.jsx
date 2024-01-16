import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  const setError = (message) => {
    setMessage({message, isError: true})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const setSuccess = (message) => {
    setMessage({message, isError: false})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    loginService.login({username, password}).then(user => {
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      setSuccess(`logged in as ${user.username}`)
      setUsername("")
      setPassword("")
      setUser(user)
    })
    .catch(error => {
      setError(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  const handleNewBlog = (event, title, author, url) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    blogService.create(newBlog, user.token)
    .then(returnedBlog => {
      console.log(blogs.concat(returnedBlog))
      setSuccess(`a new blog '${title}' by ${author} added`)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  } 

  if (user === null) {
    return (
      <div>
        <Message message={message}/>
        <h2>Login</h2>
        <Login handleSubmit={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      <Message message={message}/>
      <Logout user={user} handleLogout={handleLogout}/>
      <h2>blogs</h2>
      <Blogs blogs={blogs}/>
      <CreateBlog handleSubmit={handleNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
    </div>
  )
}

export default App