import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import propTypes from 'prop-types'

const Landing = ({isAuthenticated, roles}) => {

    if(isAuthenticated){

        if(roles==='admin'){
            return <Redirect to="/admindashboard" />
        }
        return <Redirect to="/userdashboard" />
    }
    return (
        <div className="landing">

            <div className="landing-content">
                <h2>Todo Connector</h2>
                <h3>Kindly Signup/Login to check the To Do task</h3>
                <div className="button-group">
                    <Link to="/signin">
                        <button>Signin</button>
                    </Link>
                    <Link to="/register">
                        <button>Signup</button>
                    </Link>
                </div>
            </div>

        </div>
    );

}
Landing.propTypes = {
    isAuthenticated: propTypes.bool,
    roles: propTypes.string
}
const mapStateToProps = (state) => (
    {isAuthenticated: state.auth.isAuthenticated, roles: state.auth.roles}
)

export default connect(mapStateToProps)(Landing);