import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import propTypes from 'prop-types'
import {userLogout} from '../../actions/auth'
const Nav = ({isAuthenticated, userLogout, roles}) => {
    
    return (
        <div className="header">
            {/* this div is for the logo will give width height and margin as required
        */
            }
            <h1>
                <Link to="/">
                    <i className="fa fa-code">Todo Connectors</i>
                </Link>
            </h1>

            <nav className="navbar">

                <ul className="navbar-links">
                    {
                        roles === 'admin' && <li>
                                <Link to="/admindashboard">Dashboard</Link>
                            </li>
                    }
                    {
                        roles !== 'admin' && <li>
                                <Link to="/userdashboard">Dashboard</Link>
                            </li>
                    }
                    {
                        !isAuthenticated && <li>
                                <Link to="/signin">Signin</Link>
                            </li>
                    }
                    {
                        !isAuthenticated && <li>
                                <Link to="/register">Signup</Link>
                            </li>
                    }
                    {
                        isAuthenticated && <li>
                                <Link to="/signin" onClick={() => userLogout()}>Logout</Link>
                            </li>
                    }
                    
                </ul>
            </nav>

        </div>

    )

}
Nav.propTypes = {
    isAuthenticated: propTypes.bool,
    userLogout: propTypes.func.isRequired,
    roles: propTypes.string
}
const mapStateToProps = (state) => (
    {isAuthenticated: state.auth.isAuthenticated, roles: state.auth.roles}
)

export default connect(mapStateToProps, {userLogout})(Nav);