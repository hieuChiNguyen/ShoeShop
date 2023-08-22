import axios from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/',
    headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache'
    }
})

axiosClient.interceptors.response.use((response) => {
    return response.data
})

export default axiosClient
