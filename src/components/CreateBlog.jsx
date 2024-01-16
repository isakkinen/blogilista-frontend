const CreateBlog = ({handleSubmit, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={(event) => handleSubmit(event, title, author, url)}>
                title <input value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br></br>
                author <input value={author} onChange={(event) => setAuthor(event.target.value)}></input>
                <br></br>
                url <input value={url} onChange={(event) => setUrl(event.target.value)}></input>
                <br></br>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateBlog;