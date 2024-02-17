//not an apiSlice, but a normal slice to collect data back from api- collect accesstoken from api 

/*import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState : {token : null },
    reducers : {
        
        setCredentials : (state,action) => {
            const { accessToken } = action.payload
            state.token = accessToken       //need notbe state.auth.token
        },

        logOut : (state,action) => {
            state.token = null
        } 

    }
})

export const {setCredentials,logOut} = authSlice.actions;

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token

*/


import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token