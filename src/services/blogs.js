import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject, token) => {
  const request = await axios.post(baseUrl, newObject, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })
  return request.data
}

export default { getAll, create }