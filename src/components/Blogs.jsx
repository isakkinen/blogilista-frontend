import Blog from './Blog'

const Blogs = ({blogs, handleLike, handleRemove}) => (
    <div>{blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />)}</div>
)

export default Blogs