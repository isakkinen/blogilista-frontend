import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ handleSubmit, handleCancel }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(event, title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={submit}>
                title <input id="title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br></br>
                author <input id="author" value={author} onChange={(event) => setAuthor(event.target.value)}></input>
                <br></br>
                url <input id="url" value={url} onChange={(event) => setUrl(event.target.value)}></input>
                <br></br>
                <button id="submit" type="submit">Add</button>
                <button id="cancel" type="reset" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

CreateBlog.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
}

export default CreateBlog