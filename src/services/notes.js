import axios from 'axios'
const baseUrl = 'http://localhost:3011/api/notes'
let token = null;
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    console.log("the token before request from frontend is :", token)
    const config = {
        headers: { authorization: token },
    }
    console.log("the config is ", config)
    const request = await axios.post(baseUrl, newObject, config)
    return request.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    const returnedNote = request.then(response => console.log(response.data));
    console.log("Note recieved by frontend is", returnedNote)
    return request.then(response => response.data)
}

const deleteNote = async(id) => {
    const request = await axios.delete(`${baseUrl}/${id}`)
    console.log(request.data)
    return request.data


}

export default {
    getAll,
    create,
    update,
    setToken,
    deleteNote
}