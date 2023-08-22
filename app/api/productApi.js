import axiosClient from './axiosClient'

const productApi = {
    getProduct: async (productId) => {
        const url = `/api/get_product/${productId}`
        const response = await axiosClient({
            method: 'get',
            url: url
        })
        return response
    },

    createNewProduct: async (formData) => {
        const url = '/api/post_products'
        const response = await axiosClient({
            method: 'post',
            url: url,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        })
        return response
    },

    deleteProduct: async (productId) => {
        const response = await axiosClient.delete('/api/delete_product', { data: { id: productId } })
        return response
    },

    updateProduct: async (productData) => {
        const response = await axiosClient.put('/api/edit_product', productData)
        return response
    }
}

export default productApi
