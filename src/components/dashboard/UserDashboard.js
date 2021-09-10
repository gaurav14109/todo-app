import {Fragment} from 'react'
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const UserDashboard = ({todo: {
        todos
    },user}) => {
        
    return (
        <Fragment>
 
            <div className="table-container">
            <h2>Welcome user: {user.email}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Todo Name</th>
                            <th>Todo Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((
                                todo => <tr key={todo.todo_id}>
                                    <td>{todo.todo_name}</td>
                                    <td>{todo.todo_description}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>
        </Fragment>
    )

}

UserDashboard.propTypes = {

    todo: propTypes.object.isRequired,
    user:propTypes.object.isRequired
}
const mapStateToProps = (state) => ({todo: state.todo, user:state.auth.user})
export default connect(mapStateToProps)(UserDashboard);