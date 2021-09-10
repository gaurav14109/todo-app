import React, {Fragment, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Nav from './components/layout/Nav'
import Landing from './components/layout/Landing';
import Login from './components/user/Login';
import Register from './components/user/Register';
import {Provider} from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import UserDashboard from './components/dashboard/UserDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import Alerts from './components/layout/Alerts'
import {loadUser} from './actions/auth'

if (localStorage.getItem('token')) {

    setAuthToken(localStorage.getItem('token'))
}

function App() {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Nav/>

                    <Route path="/" exact component={Landing}/>
                    <section>
                        <Alerts/>
                        <Switch>
                            <Route path="/register" exact component={Register}/>
                            <Route path="/signin" exact component={Login}/>
                            <PrivateRoute path="/userdashboard" exact component={UserDashboard}/>
                            <PrivateRoute path="/admindashboard" exact component={AdminDashboard}/>
                        </Switch>
                    </section>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
