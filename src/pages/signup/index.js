import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import {login} from '../../services/auth';

export default function Signup() {
    const history = useHistory();

    const [nomeSobrenome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setNascimento] = useState('00/00/0000');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [escolaCnpj, setCnpj] = useState('0');
    const [escolaNome, setEscolaNome] = useState('');
    const [error, setError] = useState('');
    const [dataType, setType] = useState('text');

    useEffect(() => {
        api.get('/api/Escolas/1')
        .then((response => {
            if (response.status === 200) {
                setCnpj(response.data.Cnpj);
                setEscolaNome(response.data.Nome);
            }
        }    
        ))
        .catch(error => setError("Cadastro temporariamente indisponível."))
    }, [escolaCnpj])

    async function submitForm(event) {
        event.preventDefault();
        
        let tipoUsuario = 'Aluno';

        try {
            const response = await api.post('/signup', {cpf, email, tipoUsuario, dataNascimento,
                senha, nomeSobrenome, telefone, escolaCnpj})
            if (response.status === 200) {
                authUser(response.data.token)
            }
        } catch(error) {
            if (error.response.status === 409) {
                setError(error.response.data.msg)
            }
        }
    }

    function authUser(token) {
        login(token);
        history.push('/');
    }

    function formatCpf(value) {
        return value
          .replace(/\D/g, '') 
          .replace(/(\d{3})(\d)/, '$1.$2') 
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1') 
    }

    function formatTel(value) {
        return value
          .replace(/\D/g, '') 
          .replace(/^(\d{2})(\d)/g, '($1) $2') 
          .replace(/(\d)(\d{4})$/,'$1-$2')
    }

    return (
        <div className="container w-25 p-3 col-6 align-self-center mt-5">
            <p className="h5">Cadastro</p>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={submitForm}>
                <input 
                    type="text" 
                    placeholder="Nome completo"
                    required 
                    onChange={e => setNome(e.target.value)}/>
                <input 
                    type="text" 
                    maxLength="14"
                    placeholder="CPF"
                    required
                    value={cpf}
                    onChange={e => setCpf(formatCpf(e.target.value))} />
                <input 
                    type="text" 
                    maxLength="15"
                    placeholder="Telefone"
                    required
                    value={telefone}
                    onChange={e => setTelefone(formatTel(e.target.value))} />
                <input 
                    type={dataType}
                    placeholder="Data de nascimento"
                    required
                    onFocus={e => setType('date')}
                    onChange={e => setNascimento(e.target.value)} />
                <input 
                    type="email" 
                    placeholder="E-mail"
                    required
                    onChange={e => setEmail(e.target.value)} />
                <input 
                    type="password" 
                    placeholder="Senha"
                    required
                    onChange={e => setSenha(e.target.value)} />
                <input 
                    type="text" 
                    value={escolaNome}
                    disabled />
                <button type="submit" className="btn btn-primary mr-4">Cadastrar</button>
                <button type="button" 
                    onClick={e => history.push('/in')}
                    className="btn btn-secondary">Já possui conta? Entre</button>
            </form>
        </div>
    );
}

