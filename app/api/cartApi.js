import axiosJWT from './axiosJWT'

const userApi = {
    getCart: async (userId) => {
        const response = await axiosJWT.get(`/api/get_cart/${userId}`)
        return response
    },

    addToCart: async (data) => {
        const response = await axiosJWT.post('/api/create_new_cart_item', data)
        return response
    },

    deleteProductInCart: async (cartId) => {
        const response = await axiosJWT.delete('/api/delete_cart', { data: { id: cartId } })
        return response
    }
}

export default userApi
