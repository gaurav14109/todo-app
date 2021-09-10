import axios from 'axios'
import {TODOS_SUCCESS} from './types'
export const getAllTodos = () => async dispatch => {

    try {
        const res = await axios.get('http://localhost:5000/api/todo/getall')
        dispatch({type: TODOS_SUCCESS, payload: res.data})

    } catch (err) {
        console.log(err)
    }

}

export const deleteTodo = (todo_id) => async dispatch => {
    
    try {
        await axios.delete(`http://localhost:5000/api/todo/delete/${todo_id}`)
        dispatch(getAllTodos())

    } catch (err) {
        console.log(err)
    }

}

export const createTodo = (data) => async dispatch => {
    
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(data)
    try {
        await axios.post('http://localhost:5000/api/todo/post', body, config)
        dispatch(getAllTodos())

    } catch (err) {
        console.log(err)
    }

}
//update todo 

export const updateTodo = (data, id) => async dispatch => {
    
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(data)
    try {
        await axios.put(`http://localhost:5000/api/todo/put/${id}`, body, config)
        dispatch(getAllTodos())

    } catch (err) {
        console.log(err)
    }

}