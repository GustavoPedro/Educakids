import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import {isAuthenticated, logout, getRole} from '../../services/auth';

import menuItens from './menuItens.json';

export default function Header() {
    const history = useHistory();
    const role = getRole();
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <img src={logo} alt="Educakids" height="40" />
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {menuItens[role].map((menuItem) =>
                        <Link className="nav-item nav-link" to={menuItem[1]}>{menuItem[0]}</Link>
                    )}
                </ul>
                {isAuthenticated() && 
                <button type="button" 
                    onClick={e => {logout()
                        history.push('/in')}}
                    className="btn btn-danger">Sair</button>}
            </div>
        </nav>
    )
};