import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../../services/api';

export default function ModalProfessores(props) {
    const { displayModalProfessores, toggleModalProfessores } = props
    const [Professores, setProfessores] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    async function fetchProfessores() {
        try {
            setLoading(true)
            const response = await api.get('/api/Professores')
            const { data } = response
            if (response.status === 200) {
                console.log(data)
                setProfessores([...data])
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
        fetchProfessores()
    }, [])

    return (
        <Modal isOpen={displayModalProfessores} toggle={toggleModalProfessores} role="dialog" tabIndex="-1" fade={true}>
            <ModalHeader>Professores</ModalHeader>
            <ModalBody>
                {Professores &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Adicionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Professores.map((professor) => (
                                <tr key={professor.Cpf}>
                                    <td>
                                        {professor.NomeSobrenome}
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

ModalProfessores.propTypes = {
    displayModalProfessores: PropTypes.bool,
    toggleModalProfessores: PropTypes.func
}