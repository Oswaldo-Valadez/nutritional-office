import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/' // Url de la api
});

export default instance;