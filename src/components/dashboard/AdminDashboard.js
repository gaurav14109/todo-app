import {connect} from 'react-redux';
import {useEffect, useState} from 'react'
import propTypes from 'prop-types';
import {deleteTodo, createTodo, updateTodo} from '../../actions/todo'
const AdminDashboard = ({
    todo: {
        todos,
        loading
    },
    deleteTodo,
    user,
    createTodo,
    updateTodo
}) => {
    const [createTodoView, setcreateTodoView] = useState(false)
    const [formData, setFormData] = useState({name: '', description: ''})
    const [InputTextEdit, setInputTextEdit] = useState(false)
    const {name, description} = formData

    const [todosList, setTodos] = useState([])
    useEffect(() => {

        setTodos(todos)
    }, [loading])
    const handleOnChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const setTodo = () => {
        setcreateTodoView(true)
    }
    const SubmitTodo = () => {

        createTodo(formData)

    }

    const editTodo = todo_id => e => {

        const tempTodo = todosList
        let index
        tempTodo.forEach((todo, i) => {

            if (todo_id === todo.todo_id) {

                index = i
            }
        })
        const todo = tempTodo[index]
        if (e.target.name === 'name') {
            todo.todo_name = e.target.value
        }

        if (e.target.name === 'description') {
            todo.todo_description = e.target.value
        }
        tempTodo[index] = todo
        setTodos(tempTodo)

    }

    const handleEditBox = () => {
        setInputTextEdit(!InputTextEdit)
    }

    const saveEdit = (todo_id) => {
        if(InputTextEdit){
        setInputTextEdit(!InputTextEdit)
        }
        let index
        const tempTodo = todosList
        console.log(tempTodo)
        tempTodo.forEach((todo, i) => {

            if (todo_id === todo.todo_id) {

                index = i
            }
        })
        const todo = tempTodo[index]
        updateTodo(todo, todo_id)
    }
    if (!createTodoView) {
        return (

            <div className="table-container">
                <h2>Welcome user: {user.email}</h2>

                <button
                    onClick={() => setTodo()}
                    className="btn btn-primary"
                    style={{
                        marginLeft: "5px"
                    }}>Create Todo</button>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Todo Name</th>
                            <th>Todo Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todosList.map((
                                todo => <tr key={todo.todo_id}>
                                    <td>{todo.todo_name}<br/>{InputTextEdit && <input type="text" name="name" onChange={editTodo(todo.todo_id)}/>}
                                    </td>
                                    <td>{todo.todo_description}<br/>{InputTextEdit && <input type="text" name="description" onChange={editTodo(todo.todo_id)}/>}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteTodo(todo.todo_id)}
                                            style={{
                                                width: "100px"
                                            }}>Delete</button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleEditBox()}
                                            style={{
                                                marginLeft: "5px",
                                                width: "100px"
                                            }}>Edit</button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => saveEdit(todo.todo_id)}
                                            style={{
                                                marginLeft: "5px",
                                                width: "100px"
                                            }}>Save</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>
        )
    }
    if (createTodoView) {
        return (
            <div className="create-todo">

                <form onSubmit={() => SubmitTodo()}>
                    {/* <!-- creating div for every inputs that contains label and input tag --> */}
                    <div>
                        <label>Todo_name</label><br/>
                        <input type="text" name="name" onChange={e => handleOnChange(e)} value={name}/>
                    </div>
                    <div>
                        <label>Todo_description</label><br/>
                        <textarea
                            type="text"
                            name="description"
                            onChange={e => handleOnChange(e)}
                            value={description}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>

                    </div>

                </form>

            </div>
        )
    }

}

AdminDashboard.propTypes = {
    todo: propTypes.object.isRequired,
    deleteTodo: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    createTodo: propTypes.func.isRequired,
    updateTodo: propTypes.func.isRequired
}
const mapStateToProps = (state) => ({todo: state.todo, user: state.auth.user})
export default connect(mapStateToProps, {deleteTodo, createTodo, updateTodo})(
    AdminDashboard
);