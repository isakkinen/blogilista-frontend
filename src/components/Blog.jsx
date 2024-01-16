import { useState } from "react"

const Blog = ({ blog, handleLike }) => {

  const style = {
    border: "1px solid black",
    borderRadius: "5px",
    margin: "5px 0",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    marginBottom: "10px",
  }

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "5px 10px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "5px",
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div style={style}>
      {blog.title} {blog.author}
      <button style={{...buttonStyle, marginLeft: '5px', marginRight: '5px'}} onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>

      {visible && (
        <div style={style}>
          <div><strong>URL:</strong> {blog.url}</div>
          <div>
            <strong>Likes:</strong> {blog.likes}
          </div>
          <div><strong>Author:</strong> {blog.author}</div>
          <button onClick={() => handleLike(blog)} style={buttonStyle}>like</button>
        </div>
      )}
    </div>  
  )
}

export default Blog