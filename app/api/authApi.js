import axiosClient from './axiosClient'

const authApi = {
    signUpApi: async (newUserData) => {
        const response = await axiosClient.post('/api/signup', newUserData)
        return response
    },

    signInApi: async (userEmail, userPassword) => {
        const response = await axiosClient.post('/api/signin', { email: userEmail, password: userPassword })
        return response
    },

    signOutApi: async () => {
        const response = await axiosClient.post('/api/signout')
        return response
    }
}

export default authApi
