import {useState} from "react"
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {registerUser} from '../../actions/auth'
import propTypes from 'prop-types'
const Register = ({registerUser,isAuthenticated, roles}) => {
    const [formData, setFormData] = useState({email: '', password: '', name: ''})

    const {email, password, name} = formData

    const handleOnChange = e => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const onSubmit = (e) => {

        e.preventDefault()
        registerUser(formData)
    }
    if (isAuthenticated) {
        if (roles !== 'admin') {

            return <Redirect to="/userdashboard"/>
        }
    }
    if (isAuthenticated) {
        if (roles === 'admin') {
            return <Redirect to="/admindashboard"/>
        }
    }
    return (
        <div className="user-registeration-div">

            <form onSubmit={e => onSubmit(e)}>
                {/* <!-- creating div for every inputs that contains label and input tag --> */}
                <div>
                    <label>First Name</label><br/>
                    <input type="text" value={name} name="name" onChange={e => handleOnChange(e)}/>
                </div>
                <div>
                    <label>Last Name</label><br/>
                    <input type="text"/>
                </div>
                <div>
                    <label>Email</label><br/>
                    <input type="email" value={email} name="email" onChange={e => handleOnChange(e)}/>
                </div>
                <div>
                    <label>Password</label><br/>
                    <input type="password" value={password} name="password" onChange={e => handleOnChange(e)}/>
                </div>
                <div>
                    <button type="submit">Signup</button>
                </div>

            </form>

        </div>
    )
}
Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool,
    roles: propTypes.string
}
const mapStateToProps = (state) => (
    {isAuthenticated: state.auth.isAuthenticated, roles: state.auth.roles}
)
export default connect(mapStateToProps, {registerUser})(Register)