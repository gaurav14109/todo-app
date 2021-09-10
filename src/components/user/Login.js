import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {userLogin} from '../../actions/auth'
import propTypes from 'prop-types'
const Login = ({userLogin, isAuthenticated, roles}) => {
    const [formData, setFormData] = useState({email: '', password: ''})

    const {email, password} = formData

    const handleOnChange = e => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const onSubmit = (e) => {

        e.preventDefault()
        userLogin(formData)
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
                    <label>Email</label><br/>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => handleOnChange(e)}/>
                </div>
                <div>
                    <label>Password</label><br/>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => handleOnChange(e)}/>
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>

            </form>

        </div>
    )

}
Login.propTypes = {
    userLogin: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool,
    roles: propTypes.string
}
const mapStateToProps = (state) => (
    {isAuthenticated: state.auth.isAuthenticated, roles: state.auth.roles}
)
export default connect(mapStateToProps, {userLogin})(Login);