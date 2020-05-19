import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, 
        Route, Redirect } from 'react-router-dom';
import Activities from './pages/activity/list'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Home from './pages/home';
import Discipline from './pages/discipline/list'
import DisciplineDetails from './pages/discipline/details'
import {isAuthenticated} from './services/auth';
import ActivitiesDetails from './pages/activity/components/tabs'

function Footer() {
    return (
    <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">© 2020 Copyright
            <div>Centro Universitário UNA</div>
        </div>
    </footer>
    )
}
function ReactRoutes() {
    return (
    <BrowserRouter>
        <Header />
        <Switch>
            <PublicRoute component={Signin} exact path="/in" />
            <PublicRoute component={Signup} exact path="/up" />
            <PrivateRoute component={Home} exact path="/" />
            <PrivateRoute component={Discipline} exact path="/disciplines" />
            <PrivateRoute component={DisciplineDetails} exact path="/disciplines/details" />
            <PrivateRoute component={Activities} exact path="/activities" />
            <PrivateRoute component={ActivitiesDetails} exact path="/activities/details" />
        </Switch>
        <Footer/>
    </BrowserRouter>
    )
}

const PublicRoute = props => {
    return isAuthenticated() ? <Redirect to="/in"/> : <Route {...props}/>
}

const PrivateRoute = props => {
    return isAuthenticated() ? <Route {...props}/> : <Redirect to="/in"/>
}

ReactDOM.render(<ReactRoutes />, document.getElementById('root'));