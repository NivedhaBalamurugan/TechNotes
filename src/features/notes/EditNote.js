import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditNoteForm from './EditNoteForm'
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { PulseLoader } from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {

        useTitle('techNotes: Edit Note')
    
        const {id} = useParams();

        const {username, isManager, isAdmin} = useAuth()

        const {note} = useGetNotesQuery("notesList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
                selectFromResult : ({ data }) => ({                 //for this u need spineers package
                    note : data?.entities[id]
                }),
            })

        const {users} = useGetUsersQuery("usersList" , {            //get all users
                selectFromResult : ({ data }) => ({
                        users : data?.ids.map(id => data?.entities[id]) 
                }),
        })                     


        //each emp will see only his notes but if he knows the the id , he can see other  notes as welll
        // to prevent this

        if(!note || !users.length) 
                return <PulseLoader color={"#FFF"} />

        if(!isManager && !isAdmin){
                if(note.username !== username)
                        return <p className="errmsg">No access</p>
        }

        const content = <EditNoteForm note={note} users={users} />
        
        return content;
}
export default EditNote;
