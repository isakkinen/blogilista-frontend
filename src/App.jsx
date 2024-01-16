import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const setError = (message) => {
        setMessage({ message, isError: true })
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }
    const setSuccess = (message) => {
        setMessage({ message, isError: false })
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
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event, username, password) => {
        event.preventDefault()
        loginService.login({ username, password }).then(user => {
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            setSuccess(`logged in as ${user.username}`)
            setUser(user)
        })
            .catch(error => setError(error.response.data.error))
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const createBlogRef = useRef()

    const handleNewBlog = (event, title, author, url) => {
        event.preventDefault()
        createBlogRef.current.toggleVisibility()
        const newBlog = { title, author, url }
        blogService.create(newBlog, user.token)
            .then(returnedBlog => {
                setSuccess(`a new blog '${title}' by ${author} added`)
                setBlogs(blogs.concat(returnedBlog))
            })
    }

    const handleLike = (blog) => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        blogService.update(newBlog, user.token)
            .then(returnedBlog => {
                setSuccess(`liked '${blog.title}' by ${blog.author}`)
                setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
            })
            .catch(error => setError('whoops:' + error))
    }

    const handleRemove = (blog) => {
        if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
            blogService.remove(blog.id, user.token)
                .then(() => {
                    setSuccess(`removed '${blog.title}' by ${blog.author}`)
                    setBlogs(blogs.filter(b => b.id !== blog.id))
                })
                .catch(error => setError('whoops:' + error))
        }
    }

    if (user === null) {
        return (
            <div>
                <Message message={message}/>
                <h2>Login</h2>
                <Login handleSubmit={handleLogin} />
            </div>
        )
    }

    return (
        <div>
            <Message message={message}/>
            <Logout user={user} handleLogout={handleLogout}/>
            <h2>blogs</h2>
            <Blogs blogs={blogs} handleLike={handleLike} handleRemove={handleRemove}/>
            <Togglable ref={createBlogRef} buttonLabel='New blog'>
                <CreateBlog handleCancel={() => createBlogRef.current.toggleVisibility()} handleSubmit={handleNewBlog} />
            </Togglable>
        </div>
    )
}

export default App