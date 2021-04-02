import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/' // Url de la api
});

export default instance;