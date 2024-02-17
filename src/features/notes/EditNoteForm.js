import { useState,useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave , faTrashCan} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({note, users}) => {

    const {isManager , isAdmin } = useAuth();

    const [updateNote , {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation();

    const [deleteNote , {
        isSuccess : isDelSuccess,
        isError : isDelError,
        error : delerror
    }] = useDeleteNoteMutation();

    const navigate= useNavigate();

    const [title,setTitle] = useState(note.title);
    const [text,setText] = useState(note.text);
    const [userId, setUserId] = useState(note.user);
    const [completed, setCompleted] = useState(note.completed);


    useEffect(() => {

        if(isSuccess || isDelSuccess) {
            setText('');
            setTitle('');
            setUserId('');
            navigate('/dash/notes')
        }

    },[isSuccess,isDelSuccess,navigate]) 

    const canSave = [title,text,userId].every(Boolean) && !isLoading

    const onSaveNote = async () => {
        if(canSave)
            await updateNote({id:note.id , user: userId, title, text,completed});
    }

    const onDeleteNote = async () => {
        await deleteNote({id:note.id})
    }


    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    let delbtn =null;
    if(isManager || isAdmin){
        delbtn = (
            <button 
                className="icon-button"
                title="Delete"
                disabled={!canSave}
                onClick={onDeleteNote}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }


    const errClass = (isError || isDelError)  ? "errmsg" : '';
    const validtitleclass = (!title ) ? "form__input--incomplete" : '';
    const validtextclass = (!text) ? "form__input--incomplete" : '';

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    return(
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={(e) => e.preventDefault()} >
                
                <div className="form__title-row">
                    <h2>Edit Note</h2>

                    <div className="form__actions-buttons">
                        <button 
                                className="icon-button"
                                title="Save"
                                disabled={!canSave}
                                onClick={onSaveNote}
                            >
                                <FontAwesomeIcon icon={faSave} />
                         </button>
                        {delbtn} 
                           
                    </div>
                </div>

                <label className="form__label" htmlFor="title">
                    Title
                </label>
                <input
                    className={`form__input ${validtitleclass}`}
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete="off"
                />

                <label className="form__label" htmlFor="text">
                    Text
                </label>
                <input
                    className={`form__input ${validtextclass}`}
                    type="text"
                    id="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="form__row">

                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            Work completed
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={() => setCompleted(prev => !prev)}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            Assigned To:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                            {
                                (users).map((user) => {
                                    return(
                                        <option
                                            value={user.id}
                                            kay={user.id}
                                        >
                                            {user.username}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    </div>

                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>

                </div>

            </form>


        </>
    )
}

export default EditNoteForm