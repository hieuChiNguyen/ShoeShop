import axiosClient from './axiosClient'

const userApi = {
    getCart: async (userId) => {
        const response = await axiosClient.get(`/api/get_cart/${userId}`)
        return response
    },

    addToCart: async (data) => {
        const response = await axiosClient.post('/api/create_new_cart_item', data)
        return response
    },

    deleteProductInCart: async (cartId) => {
        const response = await axiosClient.delete('/api/delete_cart', { data: { id: cartId } })
        return response
    }
}

export default userApi
