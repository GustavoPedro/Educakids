import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/Header';
import Signin from './pages/signin';

import 'bootstrap/dist/css/bootstrap.min.css';

function ReactRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact={true} component={Signin} />
            </Switch>
        </ BrowserRouter>
    )
}

ReactDOM.render(<ReactRoutes />, document.getElementById('root'));