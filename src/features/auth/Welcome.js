import {Link} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Welcome = () => {

    const {username, isManager,isAdmin} = useAuth();

    useTitle(`techNotes: ${username}`)


    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
    });
    return(

        <section className='Welcome' >
            <p>{formattedDate}</p>
            <h1>Welcome {username}!!</h1>
            <p><Link to="/dash/notes">View TechNotes</Link></p>
            {
                (isManager || isAdmin)  &&  <p><Link to="/dash/users">View User Settings</Link></p>
            }
            
            <p><Link to="/dash/notes/new">Add new Note</Link></p>
            {
                (isManager || isAdmin) &&  <p><Link to="/dash/users/new">Add new User</Link></p>                
            }
        </section>

    )
};

export default Welcome