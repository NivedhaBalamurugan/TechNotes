import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
        faRightFromBracket,
        faFileCirclePlus,
        faFilePen,
        faUserGear,
        faUserPlus,

} from '@fortawesome/free-solid-svg-icons'
import { useNavigate,  useLocation } from 'react-router-dom'
import { PulseLoader } from 'react-spinners/PulseLoader'
import {useSendLogoutMutation} from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth'


const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/ 



const DashHeader = () => {

    const{isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const [sendLogout , {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()


    useEffect(() => {
        if(isSuccess)
            navigate('/')
    },[isSuccess,navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new');
    const onNewUserClicked = () => navigate('/dash/users/new');
    const onNoteClicked = () => navigate('/dash/notes');
    const onUserClicked = () => navigate('/dash/users');



    const onClickLogOut = async () => {
        await sendLogout()
    }


    let dashclass = null;
    if(!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname))    //if not in /dash or /dash/notes ot /dash/uses
        dashclass = "dash-header__container--small"
    
    let newnotebtn = null;
    if(NOTES_REGEX.test(pathname)) {
        newnotebtn = (
            <button
                className='icon-button'
                title='New Note'
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newuserbtn = null;
    if(USERS_REGEX.test(pathname)) {
        newuserbtn = (
            <button
                className='icon-button'
                title='New User'
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userbtn = null;
    if((isManager || isAdmin) && (!USERS_REGEX.test(pathname) && pathname.includes('/dash'))) {
        userbtn = (
            <button
                className='icon-button'
                title='Users'
                onClick={onUserClicked}
            >
                <FontAwesomeIcon icon={faUserGear} />
            </button>
        )
    }

    let notebtn = null;
    if(!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notebtn = (
            <button
                className='icon-button'
                title='Notes'
                onClick={onNoteClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button 
            className='icon-button'
            title = "logout"
            onClick={onClickLogOut}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errclass = isError ? "errmsg" : "offscreen"

    return (

        <>
            <p className={errclass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashclass}`}>

                    <Link to="/dash">
                        <h1 className="dash-header__title">techNotes</h1>
                    </Link>
                    <nav className="dash-header__nav">

                        {
                            (isLoading) 
                                ? <PulseLoader color={"#FFF"} />
                                : (
                                    <>
                                        {newnotebtn}
                                        {newuserbtn}
                                        {notebtn}
                                        {userbtn}
                                        {logoutButton}
                                    </>
                                )
                        }

                    
                    </nav>                

                </div>
            </header>
        </>
    )

}
export default DashHeader