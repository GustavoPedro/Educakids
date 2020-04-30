import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../../services/api';

export default function ModalProfessores(props) {
    const { displayModalProfessores, toggleModalProfessores, professorResponsavel, setProfessorResponsavel } = props
    const [professores, setProfessores] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function fetchProfessores() {
            try {
                setLoading(true)
                const response = await api.get('/api/Professores')
                const { data } = response
                if (response.status === 200) {
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
        fetchProfessores()
    }, [])
    
    function onSave(professor) {
        setProfessorResponsavel(professor)
        toggleModalProfessores()
    }


    return (
        <Modal isOpen={displayModalProfessores} toggle={toggleModalProfessores} role="dialog" tabIndex="-1" fade={true}>
            <ModalHeader>Professores</ModalHeader>
            <ModalBody>
                {professores &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {professores.filter(professor => professor.Cpf != professorResponsavel.Cpf).map((professor) => (
                                <tr key={professor.Cpf}>
                                    <td>
                                        {professor.NomeSobrenome}
                                    </td>
                                    <td>
                                        <Button color="primary" onClick={() => onSave(professor)}> 
                                            Adicionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleModalProfessores}>Cancelar</button>
            </ModalFooter>
        </Modal>
    );
}

ModalProfessores.propTypes = {
    displayModalProfessores: PropTypes.bool,
    toggleModalProfessores: PropTypes.func,
    professorResponsavel: PropTypes.object,
    setProfessorResponsavel: PropTypes.func
}