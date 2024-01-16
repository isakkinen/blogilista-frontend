import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, handleLike, handleRemove }) => (
    <div>{blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />)}</div>
)

Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
}

export default Blogs