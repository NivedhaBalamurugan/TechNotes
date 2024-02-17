import { useParams } from "react-router-dom";
import EditUserForm from './EditUserForm';
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
    
    useTitle('techNotes: Edit User')
        const {id} = useParams();

        const {user} = useGetUsersQuery("usersList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
                selectFromResult : ({ data }) => ({
                    user : data?.entities[id]
                }),
            })

        if(!user)
               return <PulseLoader color={"#FFF"} />
        

        const content = <EditUserForm user={user} /> 
                           
        return content; 

}
export default EditUser;