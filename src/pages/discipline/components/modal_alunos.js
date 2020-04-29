import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../../services/api';

export default function ModalAlunos(props) {
    const { displayModalAlunos, toggleModalAlunos } = props
    const [alunos, setAlunos] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    async function fetchAlunos() {
        try {
            setLoading(true)
            const response = await api.get('/api/Alunos')
            const { data } = response
            if (response.status === 200) {
                console.log(data)
                setAlunos([...data])
            }
            else {
                setErrorMessage(data.toString())
            }
        } catch (error) {
            setErrorMessage(error.toString())
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAlunos()
    }, [])

    return (
        <Modal isOpen={displayModalAlunos} toggle={toggleModalAlunos} role="dialog" tabIndex="-1" fade="true">
            <ModalHeader>Alunos</ModalHeader>
            <ModalBody>
                {alunos &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Adicionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={aluno.Cpf}>
                                    <td>
                                        {aluno.NomeSobrenome}
                                    </td>
                                    <td>
                                        +
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary">Salvar</button>
            </ModalFooter>
        </Modal>
    );
}

ModalAlunos.propTypes = {
    displayModalAlunos: PropTypes.bool,
    toggleModalAlunos: PropTypes.func
}