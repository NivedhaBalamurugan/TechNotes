import { store } from "../../app/store"
import { notesApiSlice } from "../notes/notesApiSlice";
import { useEffect } from "react";
import {usersApiSlice} from '../users/usersApiSlice'
import { Outlet } from "react-router-dom";

const Prefetch = () => {

    useEffect(() => {

        console.log("subscribing");

        const notes = store.dispatch(notesApiSlice.util.prefetch('getNotes' , 'notesList' , {force:true}))
        const users = store.dispatch(usersApiSlice.util.prefetch('getUsers' , 'usersList' , {force:true}))


   // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
    //const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())


    },[]) //only when loaded

    return <Outlet />

}

export default Prefetch


//manually subscribing to make sure that page doesnt go out after 60 sec,making it remain active, then unsubscribe after we leave check usersapislice = keepunuseddata

//log - subs , unsubs, subs

//prefetch all the details 


//wrap this around dash from where we start getting data from backend