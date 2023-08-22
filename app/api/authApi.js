import axiosClient from './axiosClient'

const userApi = {
    signUpApi: async (newUserData) => {
        const response = await axiosClient.post('/api/signup', newUserData)
        return response
    },

    signInApi: async (userEmail, userPassword) => {
        const response = await axiosClient.post('/api/signin', { email: userEmail, password: userPassword })
        return response
    }
}

export default userApi
