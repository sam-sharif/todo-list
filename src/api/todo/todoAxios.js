import axios from 'axios'

const todoAxios = axios.create({
    baseURL:'http://my-todo-list.us-east-2.elasticbeanstalk.com/'
})

export default todoAxios