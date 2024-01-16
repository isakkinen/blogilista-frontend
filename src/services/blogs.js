import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data.map(format)
}

const create = async (newObject, token) => {
    const request = await axios.post(baseUrl, newObject, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    return format(request.data)
}

const update = async (newObject, token) => {
    const newBlog = {
        title: newObject.title,
        author: newObject.author,
        url: newObject.url,
        likes: newObject.likes
    }
    const result = await axios.put(`${baseUrl}/${newObject.id}`, newBlog, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    return format(result.data)
}

const remove = async (id, token) => {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
}

const format = (blog) => ({ ...blog, likes: blog.likes || 0 })

export default { getAll, create, update, remove }