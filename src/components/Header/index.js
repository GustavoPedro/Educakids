import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import {isAuthenticated, logout, getRole} from '../../services/auth';

import menuItens from './menuItens.json';

export default function Header(props) {
    const history = useHistory();
    const role = getRole();
    
    return (

    <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a href="#" className="navbar-brand">
            <img src={logo} height="40" alt="CoolBrand" />
        </a>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
                {menuItens[role] && menuItens[role].map((menuItem, index) => 
                    history.location.pathname === menuItem[1] ? 
                    <div key={index} className="nav-item nav-link disabled">{menuItem[0]}</div>
                    :
                    <Link key={index} className="nav-item nav-link active" to={menuItem[1]}>{menuItem[0]}</Link> 
               )}
            </div>
            <div className="navbar-nav ml-auto">
                {isAuthenticated() ? 
                <a onClick={e => {logout()
                    history.push('/in')}}className="nav-item nav-link text-danger">Sair</a>
                :
                <Link className="nav-item nav-link text-danger" to="/in">Entrar</Link>
                }
            </div>
        </div>
    </nav>
    )
};