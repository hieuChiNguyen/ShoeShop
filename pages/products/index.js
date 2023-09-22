import React from 'react'
import Wrapper from '@/app/Components/Client/Layout/Wrapper'
import Layout from '@/app/Components/Client/Layout/Layout'
import ListShoes from '@/app/Components/Client/Products/ListShoes'
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
