import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/app/redux/store'
import '@/assets/font_awesome_6_pro/css/all.css'

function Wrapper({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <main>{children}</main>
            </PersistGate>
        </Provider>
    )
}

export default Wrapper
