import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import {login} from '../../services/auth';

export default function Signin() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    async function submitForm(event) {
        event.preventDefault();

        try {
            const response = await api.post('/signin', {email, senha})
            if (response?.status === 200) {
                authUser(response.data.token)
            }
        } catch(error) {
            if (error?.response?.status === 404) {
                setError(error.response.data.message)
            }
        }
    }

    function authUser(token) {
        login(token);
        history.push('/');
    }

    return (
        <div className="mt-5 container center-block">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card">
                        <div className="card-body bg-light">
                            <h6 className="card-title">Login</h6>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={submitForm}>
                                <div className="form-group">
                                    <input 
                                    type="email" placeholder="E-mail"
                                    required className="form-control" 
                                    onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password" placeholder="Senha"
                                    required className="form-control" 
                                    onChange={e => setSenha(e.target.value)} />
                                </div>
                                <button type="submit" className="w-100 btn btn-primary">Entrar</button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Não tem uma conta? <strong onClick={e => history.push('/up')}>Cadastre-se</strong></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}