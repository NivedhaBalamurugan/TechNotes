import { useState , useEffect } from "react";
import { useAddnewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {ROLES} from '../../config/roles';
import useTitle from "../../hooks/useTitle";

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {


    useTitle('techNotes: New User')

    const [addnewUser , {
        isLoading,
        isSuccess,
        isError,
        error

    }] = useAddnewUserMutation()

    const navigate = useNavigate();

    const [username,setUsername] = useState('');
    const [validUsername,setValidUsername] = useState(false);
    const [password,setPassword] = useState('');
    const [validPassword,setValidPassword] = useState(false);
    const [roles,setRoles] = useState(["Employee"]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    },[username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    },[password])

    useEffect(() => {

        if(isSuccess){
            setPassword('');
            setUsername('');
            setValidPassword(false);
            setValidUsername(false);
            setRoles([]);
            navigate('/dash/users')
        }

    },[isSuccess,navigate])     //even if no navigate, not a issue

    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,   //html collections
            (option) => option.value
        )
        setRoles(values);
    }

    const canSave = [roles.length,validPassword,validUsername].every(Boolean) && !isLoading ;   //all true and not loading, then can save is true

    const onSaveUserClicked = async (e) => {
        if(canSave)
            await addnewUser({username, password, roles})
    }


    const errClass = isError ? "errmsg" : "offscreen";
    const validUserclass = !validUsername ? "form__input--incomplete" : '';
    const validPwdclass = !validPassword ? "form__input--incomplete" : '';
    const validRolesclass = !Boolean(roles.length) ? "form__input--incomplete" : '';


    return(
        
        <div>

            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
                
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button 
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                            onClick={onSaveUserClicked}
                        >
                            <FontAwesomeIcon icon={faSave} />
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

        </div>


    )   
}
export default NewUserForm;