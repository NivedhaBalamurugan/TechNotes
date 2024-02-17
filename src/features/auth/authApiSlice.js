/*import { apiSlice } from "../../app/api/apiSlice";
import  { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({

        login : builder.mutation({

            query: (credentials) => ({
                url: '/auth',
                method: 'POST',
                body : {
                    ...credentials
                }
            })

        }),


        sendLogOut : builder.mutation({

            query: () => ({
                url : '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {         //verify query fulfilled

                try {
                    //response - const {data } = - cookie cleared
                    const { data} = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())  //token to null in local state
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())  //clear cache
                    },1000)
                }   catch(err) {
                    console.log(err)
                }

            }

        }),


        refresh : builder.mutation({

            query: () => ({
                url: '/auth/refresh',
                method : 'GET'
            }), 
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {         //verify query fulfilled

                try {
                    
                    const {data} = await queryFulfilled
                    console.log(data);
                    const {accessToken} = data;
                    dispatch(setCredentials({accessToken}))  
                }   catch(err) {
                    console.log(err)
                }

            }

        }),

    })
})

export const {
    useLoginMutation,
    useSendLogOutMutation, 
    useRefreshMutation 
} = authApiSlice

*/

import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 