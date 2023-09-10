import axios from 'axios'
import jwtDecode from 'jwt-decode'
import axiosClient from './axiosClient'

const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/',
    headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache'
    }
})

const resetAccessToken = async () => {
    try {
        const res = await axiosClient.post('/auth/refresh', { withCredentials: true })
        console.log('check res.data reset access token axiosJWT: ', res)
        return res.newAccessToken
    } catch (error) {
        console.log(error)
    }
}

axiosJWT.interceptors.request.use(async (config) => {
    let date = new Date()
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        const decoded = jwtDecode(accessToken)
        console.log('check time exp: ', decoded.exp)
        console.log('check time date: ', date.getTime() / 1000)

        if (decoded.exp < date.getTime() / 1000) {
            localStorage.removeItem('accessToken')
            delete axiosJWT.defaults.headers.common['Authorization']
            const newAccessToken = await resetAccessToken()
            localStorage.setItem('accessToken', newAccessToken)
            axiosJWT.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
            console.log('check authorization after refresh: ', `Bearer ${newAccessToken}`)
        }
    }

    return config
})

axiosJWT.interceptors.response.use((response) => {
    // console.log('check axiosJWT: ', response)
    return response.data
})

export default axiosJWT
