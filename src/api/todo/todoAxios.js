import axios from 'axios'

const todoAxios = axios.create({
    baseURL:'http://localhost:8080'
})

export default todoAxios