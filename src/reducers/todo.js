import {TODOS_SUCCESS,REMOVE_TODOS} from '../actions/types'
const initialState = {
    todo: '',
    todos: [],
    loading: true,
    error:''
}

export default function todo(state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case TODOS_SUCCESS:
            
            return {...state, todos:payload, loading:false}
        case REMOVE_TODOS:
                return {...state, loading:true, todos:[], todo:''}
        default:
            return state
    }
}