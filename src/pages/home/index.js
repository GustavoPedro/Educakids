import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {getRole} from '../../services/auth';

export default function Home() {
    const [cpf, setCpf] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [infoStatus, setInfoStatus] = useState('');
    const [senhaStatus, setSenhaStatus] = useState('');

    const [NomeSobrenome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
      api.get('/api/Escolas/1')
      .then((response => {
          if (response.status === 200) {
            api.get('/api/Usuario')
            .then((resp => {
              setCpf(resp.data.Cpf);
              setTipoUsuario(getRole());
              setNome(resp.data.NomeSobrenome);
              setEmail(resp.data.Email);
              setTelefone(resp.data.Telefone);
            }))
          }
        }))
     }, [tipoUsuario])

    async function changePassword() {
      setSenhaStatus('');
      if (senha !== "") {
        try {
          const response = await api.put('/api/Usuarios/Senha', {email, senha})
          if (response.status === 200) {
            setSenhaStatus('success')
          }
        } catch(error) {
          setSenhaStatus('fail')
        }
      }
    }

    async function updateUserInfo() {
      try {
        setSenha('');
        const response = await api.put('/api/Usuarios', {
          cpf, tipoUsuario, email, telefone, NomeSobrenome})
        if (response.status === 200) {
          setInfoStatus("success")
        }
      } catch(error) {
        setInfoStatus("fail")
      }
    }

    function formatTel(value) {
      return value
        .replace(/\D/g, '') 
        .replace(/^(\d{2})(\d)/g, '($1) $2') 
        .replace(/(\d)(\d{4})$/,'$1-$2')
    }

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7">
            <h1 className="my-4">Bem vindo, <small> {NomeSobrenome}!</small></h1>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">algo</h2>
                <p className="card-text">[texto]</p>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card my-4">
              <h5 className="card-header">Editar dados</h5>
              <div className="card-body">
                  {infoStatus === 'success' && 
                      <div className="alert alert-success" role="alert">
                          Informações atualizadas com sucesso.
                      </div>
                  }
                  {infoStatus === 'fail' && 
                      <div className="alert alert-danger" role="alert">
                          Erro ao atualizar os dados.
                      </div>
                  }
                <input type="text" 
                  onChange={e => setNome(e.target.value)}
                  className="form-control mb-2" value={NomeSobrenome} />
                <input 
                  onChange={e => setEmail(e.target.value)}
                  type="text" className="form-control mb-2" value={email} 
                  disabled />
                <input type="text" 
                  maxLength="15"
                  onChange={e => setTelefone(formatTel(e.target.value))}
                  className="form-control mb-2" value={telefone} />
                <button 
                  onClick={e => updateUserInfo()}
                  type="button" className="btn btn-primary w-100">Salvar</button>
              </div>
            </div>
              <div className="card my-4">
                <h5 className="card-header">Trocar senha</h5>
                <div className="card-body">
                  {senhaStatus === 'success' && 
                      <div className="alert alert-success" role="alert">
                          Senha alterada com sucesso.
                      </div>
                  }
                  {senhaStatus === 'fail' && 
                      <div className="alert alert-danger" role="alert">
                          Por favor, escolha outra senha.
                      </div>
                  }
                  <input 
                    type="password" 
                    className="form-control mb-2" 
                    placeholder='Nova senha'
                    value={senha}
                    onChange={e => setSenha(e.target.value)} />
                  <button type="button" 
                    onClick={e => changePassword()}
                    className="btn btn-primary w-100">Salvar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}