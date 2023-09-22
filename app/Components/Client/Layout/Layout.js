import React from 'react'
import NavBar from '../Header/NavBar'
import Footer from '../Footer/Footer'

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
