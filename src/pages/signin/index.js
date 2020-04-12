import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import {login} from '../../services/auth';

export default function Signin() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    async function submitForm(event) {
        event.preventDefault();
        await api.post('/signin', {email, senha})
        .then((resp => resp.message ? setError(resp.message) : authUser(resp.data.token)))
        .catch(error => {setError(error.response.data.message)})
    }

    function authUser(token) {
        login(token);
        history.push('/');
    }

    return (
        <div className="container w-25 p-3 col-6 align-self-center mt-5">
            <p className="h5">Entrar</p>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={submitForm}>
                <input 
                    type="email" 
                    placeholder="E-mail"
                    required 
                    onChange={e => setEmail(e.target.value)}/>
                <input 
                    type="password" 
                    placeholder="Senha"
                    required
                    onChange={e => setSenha(e.target.value)} />
                <button type="submit" className="btn btn-primary mr-2">Entrar</button>
                <button type="button" 
                    onClick={e => history.push('/up')}
                    className="btn btn-secondary">Não tem conta? Cadastre-se!</button>
            </form>
        </div>
    );
}