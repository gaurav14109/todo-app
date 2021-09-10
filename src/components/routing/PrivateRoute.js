import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import propTypes from 'prop-types';
const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props => isAuthenticated
                ? <Component {...props}/>
                : <Redirect to="/signin"/>
            }
        />
    )

}
PrivateRoute.propTypes = {
    isAuthenticated: propTypes.bool
}
const mapStateToProps = (state)=>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute);