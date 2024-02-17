import  { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';
import EditNote from './features/notes/EditNote';
import NewUserForm from './features/users/NewUserForm';
import NewNote from './features/notes/NewNote';
import EditUser from './features/users/EditUser';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import useTitle from './hooks/useTitle';

function App() {

  useTitle('Bala Repairs');

  return (

    <Routes>
      <Route path="/" element = { <Layout /> } >
          
          <Route index element = { <Public /> } />

          <Route path="login" element = { <Login /> } />

          <Route element = { <PersistLogin /> } > {/* start of persist login */}
          <Route element = { <RequireAuth allowedRoles={[...Object.values(ROLES)]} /> } > {/* start of req auth - pass the array not roles object ,,, dash to visible to all roles*/}
          <Route element = { <Prefetch /> } > {/* start of prefetch */}

              <Route path="dash" element = { <DashLayout /> } >
              
                    <Route index element = { <Welcome /> } />

                    <Route element = { <RequireAuth allowedRoles={[ROLES.Manager,ROLES.Admin]} /> } > {/* users can be accessed onyl by admin, manager */}
                    <Route path="users" >

                          <Route index element = { <UsersList /> } />

                          <Route path=":id" element = { <EditUser /> } />

                          <Route path="new" element = { <NewUserForm /> } />

                    </Route>{/*end users */}
                    </Route>

                    <Route path="notes" >

                          <Route index element = { <NotesList /> } />

                          <Route path=":id" element = { <EditNote /> } />

                          <Route path="new" element = { <NewNote /> } />

                    </Route>{/*end notes */}

              </Route>{/*end dash */}

          </Route>{/* end of prefetch */}
          </Route>{/*end of req auth */}
          </Route>{/* end of persist login */}

      </Route>
    </Routes>

  )
}

export default App;


