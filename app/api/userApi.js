import axiosClient from './axiosClient'

const userApi = {
    createNewUser: async (data) => {
        // console.log('Check new data: ', data)
        const response = await axiosClient.post('/api/create_new_user', data)
        return response
    },

    getAllUsers: async (inputId) => {
        const response = await axiosClient.get(`/api/get_all_users?id=${inputId}`)
        return response
    },

    getUserProfile: async (userId) => {
        const response = await axiosClient.get(`/api/get_user_profile/${userId}`)
        return response
    },

    deleteUser: async (userId) => {
        const response = await axiosClient.delete('/api/delete_user', { data: { id: userId } })
        return response
    },

    updateUser: async (inputData) => {
        const response = await axiosClient.put('/api/edit_user', inputData)
        return response
    },

    updateAvatarImage: async (data) => {
        const response = await axiosClient.put('/api/update_avatar', data)
        return response
    },

    getUserAvatar: async (userId) => {
        const response = await axiosClient.get(`/api/get_avatar/${userId}`)
        return response
    }
}

export default userApi
