import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../../services/api';

export default function ModalAlunos(props) {
    const { displayModalAlunos, toggleModalAlunos, setAlunosDisciplina, alunosDisciplina } = props
    const [alunos, setAlunos] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function fetchAlunos() {
            try {
                setLoading(true)
                const response = await api.get('/api/Alunos')
                const { data } = response
                if (response.status === 200) {
                    setAlunos(
                        data.map((aluno) => {
                            return { ...aluno, checked: false }
                        }));
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
        fetchAlunos()
    }, [])

    useEffect(() => {
        function setAlunosDisciplina() {
            setAlunos(
                alunos.filter((aluno) => {
                    return alunosDisciplina.findIndex(al => al.Cpf === aluno.Cpf) < 0
                }));
        }
        setAlunosDisciplina()
    }, [props.alunosDisciplina]);

    function onSave() {
        if (alunos.some(al => al.checked)) {
            setAlunosDisciplina((prev) => {
                const alunosAdicionados = alunos.filter((aluno) => {
                    return aluno.checked
                }).map((aluno) => {
                    delete aluno.checked
                    return aluno
                })
                const alunosDisciplina = [...prev]
                alunosDisciplina.push(...alunosAdicionados)
                return alunosDisciplina;
            })
        }
        toggleModalAlunos()
    }

    return (
        <Modal isOpen={displayModalAlunos} toggle={toggleModalAlunos} role="dialog" tabIndex="-1" fade={true}>
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
                            {alunos.map((aluno, index) => (
                                <tr key={aluno.Cpf}>
                                    <td>
                                        {aluno.NomeSobrenome}
                                    </td>
                                    <td>
                                        <Input type="checkbox" checked={aluno.checked || false} onChange={(event) => {
                                            event.persist()
                                            setAlunos((prev) => {
                                                const alunosDisciplina = [...prev];
                                                alunosDisciplina[index] = { ...alunos[index], checked: event.target.checked }
                                                return alunosDisciplina
                                            })
                                        }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleModalAlunos}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={() => onSave()}>Salvar</button>
            </ModalFooter>
        </Modal>
    );
}

ModalAlunos.propTypes = {
    displayModalAlunos: PropTypes.bool,
    toggleModalAlunos: PropTypes.func,
    setAlunosDisciplina: PropTypes.func,
    alunosDisciplina: PropTypes.array
}