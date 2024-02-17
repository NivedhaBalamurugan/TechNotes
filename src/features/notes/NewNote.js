import {selectAllUsers} from '../users/usersApiSlice';
import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice';
import { PulseLoader } from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';

const NewNote = () => {
    

    useTitle('techNotes: New Note')

    const {users} = useGetUsersQuery("usersList" , {            //get all users
        selectFromResult : ({ data }) => ({
            users : data?.ids.map(id => data?.entities[id]) 
        }),
    })

    if(!users)
        <PulseLoader  color={"#FFF"} />
        
    const content =  <NewNoteForm users={users} />

    return content;

}
export default NewNote;
