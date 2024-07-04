import axios from 'axios'
const baseUrl = 'http://localhost:3011/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    const returnedNote = request.then(response => console.log(response.data));
    console.log("Note recieved by frontend is", returnedNote)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update
}