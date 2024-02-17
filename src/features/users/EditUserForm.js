import { useState , useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave , faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ROLES} from '../../config/roles';


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({user}) => {

    const [updateUser , {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const [deleteUser , {
        isSuccess : isDelSuccess,
        isError : isDelError,
        error: delerror
    }] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [username,setUsername] = useState(user.username);
    const [validUsername,setValidUsername] = useState(false);
    const [password,setPassword] = useState('');
    const [validPassword,setValidPassword] = useState(false);
    const [roles,setRoles] = useState(user.roles);
    const [active,setActive] = useState(user.active);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    },[username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    },[password])

    useEffect(() => {

        if(isSuccess || isDelSuccess){
            setPassword('');
            setUsername('');
            setRoles([]);
            navigate('/dash/users')
        }

    },[isSuccess,isDelSuccess,navigate])     //even if no navigate, not a issue


    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,   //html collections
            (option) => option.value
        )
        setRoles(values);
    }


    const onSaveUserClicked = async (e) => {
        if(password)
            await updateUser({id : user.id, username, password, roles, active});
        else
            await updateUser({id : user.id, username, roles, active });
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({id : user.id});
    }

    let canSave;
    if(password)
        canSave = [roles.length,validPassword,validUsername].every(Boolean) && !isLoading ;   //all true and not loading, then can save is true
    else
        canSave = [roles.length,validUsername].every(Boolean) && !isLoading ;   //all true and not loading, then can save is true


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    const validUserclass = !validUsername ? "form__input--incomplete" : '';
    const validPwdclass = (password && !validPassword) ? "form__input--incomplete" : '';
    const validRolesclass = !Boolean(roles.length) ? "form__input--incomplete" : '';

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''; 

    return(

        <>
            <p className={errClass}>
                {errContent}
            </p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
                
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button 
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                            onClick={onSaveUserClicked}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button 
                            className="icon-button"
                            title="Delete"
                            disabled={!canSave}
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="username" >
                    Username : <span className="nowrap">[3-20 letters]</span>
                </label>
                <input 
                    className={`form__input ${validUserclass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label className="form__label" htmlFor="password" >
                    Password : <span className="nowrap">[4-12 chars incl. !@#$%]</span>
                </label>
                <input 
                    className={`form__input ${validPwdclass}`}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className="form__label form__checkbox-container" htmlFor="user-active" >
                    Active : 
                </label>
                <input 
                    className="form__checkbox"
                    id="user-active"
                    name="user-active"
                    type="checkbox"
                    checked={active}
                    onChange={() => setActive(prev => !prev)}
                />

                <label className="form__label" htmlFor="roles">
                    Assigned RoleS:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesclass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {
                        Object.values(ROLES).map((role) => {
                            return (
                                <option
                                    key = {role}
                                    value={role}
                                >{role}</option>
                            )
                        })
                    }
                </select>


            </form>

        </>

    )

}

export default EditUserForm
