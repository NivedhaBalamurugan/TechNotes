import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import { PulseLoader } from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"

const UsersList = () => {


    useTitle('techNotes: Users List')
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(  'usersList',     //optional arg can be added if use setuplisteners in store.js
         {
            pollingInterval:60000,   //requery every 60 s
            refetchOnFocus:true,  //refetch each time
            refetchOnMountOrArgChange:true
        }
    )

    let content

    if (isLoading) 
        content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users
        
        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ids?.length
                        ? ids.map(userId => <User key={userId} userId={userId} />)
                        : null
                    }
                </tbody>
            </table>
        )
    }

    return content
}
export default UsersList

