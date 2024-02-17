import { useGetNotesQuery } from "../notes/notesApiSlice";
import Note from './Note'
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const NotesList = () => {


    useTitle('techNotes: Notes List')
    const {username,isManager, isAdmin } = useAuth()

    const {
        data:notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery( 'notesList',   //optional arg can be added if use setuplisteners in store.js
             {
            pollingInterval:15000,   //requery every 60 s
            refetchOnFocus:true,  //refetch each time we swicth to another tab
            refetchOnMountOrArgChange:true
        }
    );

    let content;

    if(isLoading)
        content=<PulseLoader color={"#FFF"} />
    
    if(isError)
        content=<p className="errmsg">{error?.data?.message}</p>

    if (isSuccess) {

        const { ids, entities } = notes


        //to show only that employee's note
        let filteredIds
        if(isManager || isAdmin )
            filteredIds = [...ids]
        else
            filteredIds = ids.filter(noteid => entities[noteid].username === username )
        
        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Status</th>
                        <th scope="col" className="table__th note_created">Created</th>
                        <th scope="col" className="table__th note_updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note_username">Owner</th>
                        <th scope="col" className="table__th note_edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ids?.length
                        ? filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)
                        : null
                    }
                </tbody>
            </table>
        )
    }
    
    return content
}
export default NotesList;