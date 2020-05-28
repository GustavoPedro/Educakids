import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import api from '../../../services/api';
import Snackbars from '../../../components/Snackbar';

export default function AlunosAtividade({ atividadeDetails }) {

    const [alunos, setAlunos] = useState()
    const [loading, setLoading] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
    const [message, setMessage] = useState("");

    function showErrorSnackbar(message) {
        setMessage(message)
        setOpenErrorSnackbar(true)
    }    

    function showSuccessSnackbar(message) {
        setMessage(message)
        setOpenSuccessSnackbar(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    };

    

    useEffect(() => {
        async function fetchAlunos() {
            setLoading(true)
            try {
                const response = await api.get(`/api/AtividadeUsuario/${atividadeDetails.IdAtividade}`)
                if (response?.status === 200) {
                    const { data } = response
                    setAlunos(data)
                }
            } catch (e) {
                console.log(e)
                showErrorSnackbar(e?.response?.data)
            }
            setLoading(false)
        }
        fetchAlunos()
    }, [])

    async function atualizarNotaEStatus(atividade_usuario) {
        try{
            const response = await api.put(`api/AtividadeUsuarioDisciplina/${atividade_usuario.IdAtividade}`,atividade_usuario)
            if (response?.status === 200) {
                const {data} = response
                showSuccessSnackbar(data?.msg)
            }
        }catch(e){
            showErrorSnackbar(e?.response?.data)
        }
    }

    return (
        <div>
            {!loading ? (
                <MaterialTable
                    columns={[
                        { title: "Aluno", field: "Nome" },
                        { title: "Status", field: "Status" },
                        { title: "Total", field: "Total" },
                    ]}
                    data={alunos}
                    title="Alunos Designados"
                    editable={{
                        onRowUpdate: (newData, oldData) => {
                            atualizarNotaEStatus(newData)
                        }
                    }}
                />
            ) : (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)
            }
            <Snackbars handleClose={handleClose}  message={message} openErrorSnackbar={openErrorSnackbar} openSuccessSnackbar={openSuccessSnackbar} />
        </div>
    );
}
AlunosAtividade.propTypes = {
    atividadeDetails: PropTypes.object.isRequired,
}