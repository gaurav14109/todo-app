import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from 'uuid';
export const setAlert = (msg)=> dispatch=>{

    const id = uuidv4(); ;
    dispatch({type:SET_ALERT, payload:{id, msg }}); //dispatch send  type to reducer which new state which will return state to store

    setTimeout(()=>dispatch({type:REMOVE_ALERT, payload:id}), 2000)
}
