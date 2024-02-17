import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';

import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState= usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        
        getUsers : builder.query({

            query: () => ({
                url : '/users',
                validateStatus : (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
          //  keepUnusedDataFor:5, - default 60s
            transformResponse: responseData => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id
                    return user;
                });
                return usersAdapter.setAll(initialState,loadedUsers)
            },
            providesTags: (result , error, arg) => {
                if(result?.ids) {
                    return [
                        {type: 'User' , id: 'LIST' },      //we hv id as list and also added id for updateuser 
                        ...result.ids.map((id) => ({type:'User' , id }))
                    ]
                }
                else
                    return [{ type: 'User' , id : 'LIST' }]
            }

        }),


        addnewUser : builder.mutation({

            query: (initialUserData) => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                {type: 'User' , id : 'LIST'}   //id is list
            ]

        }),

        updateUser : builder.mutation({

            query: (initialUserData) => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User' , id : arg.id }     //id is particular arg.id
            ]

        }),

        deleteUser : builder.mutation({

            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: {
                   id
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User' , id : arg.id}
            ]

        }),


    })
})

export const {
    useGetUsersQuery,
    useAddnewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;


//returns the entire query result obj
export const selectUsersResult =  usersApiSlice.endpoints.getUsers.select(); 

//creats memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data  //normalized state objects with ids and entities
)


//getselectors create these selectors and we rename with akkias name using destructuring
export const { 
    selectAll : selectAllUsers,
    selectById : selectUserById,
    selectIds : selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);  //if nothing is in the res, then take the intial state

