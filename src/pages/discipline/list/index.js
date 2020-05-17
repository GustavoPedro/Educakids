import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';
import MaterialTable from "material-table";
import Snackbars from '../../../components/Snackbar'


export default function List(props) {
    const [disciplinas, setDisciplinas] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [openSuccessSnackbar,setOpenSuccessSnackbar] = useState(false)
    const [openErrorSnackbar,setOpenErrorSnackbar] = useState(false)
    const [message,setMessage] = useState("");

    useEffect(() => {
        fetchDisciplinas()
    }, [])


    function showErrorSnackbar(message) {
        setMessage(message)
        setOpenErrorSnackbar(true)
    }
    function showSuccessSnackbar(message) {
        setMessage(message)
        setOpenSuccessSnackbar(true)
    }

    async function fetchDisciplinas() {
        try {
            setLoading(true)
            const response = await api.get('/api/Disciplina')
            const { data } = response
            if (response?.status === 200) {
                setDisciplinas([...data])
            }
            else {
                showErrorSnackbar(data.toString())
            }
        } catch (error) {
            showErrorSnackbar(error.toString())
        }
        finally {
            setLoading(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    };

    async function deleteDisciplina(event, rowData) {
        try {
            const response = await api.delete(`/api/Disciplina/${rowData?.id}`)
            if (response?.status == 200) {
                showSuccessSnackbar("Disciplina deletada com sucesso")
                setDisciplinas(disciplinas.filter((disciplina) => disciplina.id != rowData.id))
            }
        } catch (e) {
            console.log(e?.response?.data)
            showErrorSnackbar(e?.response?.data.toString())
        }
    }

    function renderTable() {
        if (disciplinas) {
            return (
                <div>
                    <MaterialTable
                        columns={[
                            { title: "Materia", field: "mateira" },
                            { title: "Descricao", field: "descricao" },
                            { title: "Turno", field: "turno" },
                            { title: "Professor Responsável", field: "professorResponsavel.NomeSobrenome" },
                        ]}
                        data={disciplinas}
                        actions={[
                            {
                                icon: 'delete',
                                tooltip: 'Deletar disciplina',
                                onClick: (event, rowData) => deleteDisciplina(event, rowData)
                            }
                        ]}
                        title="Disciplinas"
                        onRowClick={(evt, selectedRow) => { props.history.push('/disciplines/details', { ...selectedRow, action: 'Change' }) }}
                    />
                    <div className="form-group mt-3">
                        <button type="button" className="btn btn-primary" onClick={() => props.history.push('/disciplines/details', { action: 'Add' })}>Adicionar Disciplina</button>
                    </div>
                </div>

            )
        }
        return (
            <div className="d-flex justify-content-center">
                <h3>Lista Vazia</h3>
            </div>
        )
    }

    return (
        <div className="container">
            <h2 className="mb-5">Disciplinas</h2>
            {
                errorMessage ? (
                    <div className="alert alert-danger" role="alert">
                        Não foi possível buscar lista de usuários pelo seguinte motivo: {errorMessage}
                    </div>
                ) : !isLoading ? renderTable() : (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
            <Snackbars handleClose={handleClose} openErrorSnackbar={openErrorSnackbar} openSuccessSnackbar={openSuccessSnackbar} message={message}/>
        </div>
    );
}
