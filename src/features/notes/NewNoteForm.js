import { useState,useEffect } from 'react';
import {useAddnewNoteMutation} from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";



const NewNoteForm = ({users}) => {
   
    const [addnewNote , {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddnewNoteMutation()

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [text, setText ] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if(isSuccess){
            setText('');
            setTitle('');
            setUserId('');
            navigate('/dash/notes')
        }
    },[isSuccess,navigate])

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onNoteSave = async () => {
        if(canSave)
            await addnewNote({user : userId , title,text});
    }
  
    const errclass = (isError) ? "errmsg" : "offscreen";
    const validtitleclass = (!title ) ? "form__input--incomplete" : '';
    const validtextclass = (!text) ? "form__input--incomplete" : '';

    return (
        <>
            <p className={errclass}>{error?.data?.message}</p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
                
                <div className='form__title-row'>
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        <button 
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                            onClick={onNoteSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <label className='form__label' htmlFor='title' >
                    Title
                </label>
                <input
                    className={`form__input ${validtitleclass}`}
                    id="title"
                    name="title"
                    autoComplete='off'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className='form__label' htmlFor='text' >
                    Text
                </label>
                <input
                    className={`form__input ${validtextclass}`}
                    id="text"
                    name='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                /> 

                <label className='form__label' htmlFor='username'>
                    Assigned to
                </label>
                <select
                    id="username"
                    name="username"
                    className='form__select'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    {
                        users.map((user) => {
                            return(
                                <option
                                value={user.id}
                                key={user.id}
                                >
                                    {user.username}
                                </option>
                            )
                        })
                    }
                </select>
                

            </form>
        </>
    )


}

export default NewNoteForm;