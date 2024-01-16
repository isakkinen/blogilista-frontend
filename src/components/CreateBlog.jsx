import { useState } from 'react';

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
                title <input value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br></br>
                author <input value={author} onChange={(event) => setAuthor(event.target.value)}></input>
                <br></br>
                url <input value={url} onChange={(event) => setUrl(event.target.value)}></input>
                <br></br>
                <button type="submit">Add</button>
                <button type="reset" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default CreateBlog;