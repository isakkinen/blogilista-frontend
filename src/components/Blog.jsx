import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {

    const style = {
        border: '1px solid black',
        borderRadius: '5px',
        margin: '5px 0',
        padding: '10px',
        backgroundColor: '#f2f2f2',
        marginBottom: '10px',
    }

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '5px 10px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '5px',
    }

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => setVisible(!visible)
    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    console.log(user, blog)
    const showRemove = user && user.username === blog.user.username

    return (
        <div style={style} className="blog">
            {blog.title} - {blog.author}
            <button style={{ ...buttonStyle, marginLeft: '5px', marginRight: '5px' }} onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>

            {visible && (
                <div style={style}>
                    <div><strong>URL:</strong> {blog.url}</div>
                    <div>
                        <strong>Likes:</strong> {blog.likes}
                    </div>
                    <div><strong>User:</strong> {blog.user.username}</div>
                    <button onClick={() => handleLike(blog)} style={buttonStyle}>like</button>
                    { showRemove && <button id="remove" onClick={() => handleRemove(blog)} style={{ ...buttonStyle, backgroundColor: 'red', marginLeft: '5px', marginRight: '5px' }}>remove</button> }
                </div>
            )}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
}

export default Blog