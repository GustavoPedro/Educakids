import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    async function submitForm(event) {
        event.preventDefault();
        await api.post('/signin', {email, senha})
        .then((resp => resp.message ? setError(resp.message) : console.log(resp.data)))
        .catch((erro => setError('Usuário ou senha incorretos')))
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
                <button type="submit" class="btn btn-primary mr-2">Entrar</button>
                <button type="button" class="btn btn-secondary">Não tem conta? Cadastre-se!</button>
            </form>
        </div>
    );
}