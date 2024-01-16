import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      // set token here!
    }
  }, [])

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    console.log(username, password)
    const user = await loginService.login({username, password})

    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))

    setUsername("")
    setPassword("")
    setUser(user)
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
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  } 

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Login handleSubmit={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      <Logout user={user} handleLogout={handleLogout}/>
      <h2>blogs</h2>
      <Blogs blogs={blogs}/>
      <CreateBlog handleSubmit={handleNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
    </div>
  )
}

export default App