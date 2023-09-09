import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        id: '',
        email: '',
        username: '',
        role: null
    },
    reducers: {
        signin: (state, action) => {
            state.loggedIn = true
            state.id = action.payload.id
            state.email = action.payload.email
            state.username = action.payload.username
            state.role = action.payload.role
        },
        signout: (state) => {
            state.loggedIn = false
            state.id = ''
            state.email = ''
            state.username = ''
            state.role = null
        }
    }
})

export const { signup, signin, signout } = authSlice.actions

export default authSlice.reducer
