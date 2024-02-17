import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import {memo} from 'react';


const Note = ({noteId}) => {

    const {note} = useGetNotesQuery("notesList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 //for this u need spineers package
            note : data?.entities[noteId]
        }),
    })

    const navigate=useNavigate();

    if(note)
    {
        const handleEdit = () => navigate(`/dash/notes/${noteId}`);
        const created = new Date(note.createdAt).toLocaleString('en-Us',{day : 'numeric' , month : 'long'} );
        const updated = new Date(note.updatedAt).toLocaleString('en-Us',{day : 'numeric' , month : 'long'} );



        return (

            <tr className="table__row note">
                <td className='table__cell note_status'>
                    {
                        note.completed ? <span className="note_status--completed">completed</span>
                        :   <span className="note-status--open">Open</span>
                    }
                </td>
                <td className='table__cell note_created'>
                    {created}
                </td>
                <td className='table__cell note_updated'>
                    {updated}
                </td>
                <td className='table__cell note_title'>
                    {note.title}
                </td>
                <td className='table__cell note_username'>
                    {note.username}
                </td>
                <td className='table__cell'>
                    <button 
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>

            </tr>

        )

    }   
    else
        return null;

}
const memorizedNote = memo(Note)

export default memorizedNote   //this will rerender the comp, only if there are  any changes