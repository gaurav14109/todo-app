import {combineReducers} from "redux";
import auth from './auth'
import todo from './todo'
import alerts from './alerts'
export default combineReducers({
    auth,
    todo,
    alerts
})