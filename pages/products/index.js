import React from 'react'
import Wrapper from '@/app/client_components/Layout/Wrapper'
import Layout from '@/app/client_components/Layout/Layout'
import ListShoes from '@/app/client_components/ListShoes'
import '@/styles/globals.css'

function ProductsPage() {
    return (
        <Wrapper>
            <Layout>
                <ListShoes />
            </Layout>
        </Wrapper>
    )
}

export default ProductsPage
