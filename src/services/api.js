import axios from 'axios'

const api = axios.create({
    baseURL: "api-arboretto-production-59fe.up.railway.app"
});

export default api;