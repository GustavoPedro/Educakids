import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';
import MaterialTable from "material-table";
import ModalAtividades from '../components/modal_atividades'
import Snackbars from '../../../components/Snackbar'


export default function List(props) {
    const [displayModalAtividades, setDisplayModalAtividades] = useState(false)
    const [atividades, setAtividades] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    const [message, setMessage] = useState("");
    const toggleModalAtividades = () => setDisplayModalAtividades(!displayModalAtividades);

    useEffect(() => {
        fetchAtividades()
    }, [])

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

    async function fetchAtividades() {
        try {
            setLoading(true)
            const response = await api.get('/api/Atividades')
            const { data } = response
            if (response?.status === 200) {
                console.log(data)
                setAtividades([...data])
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

    function renderTable() {
        if (atividades) {
            return (
                <div>
                    <MaterialTable
                        columns={[
                            { title: "Atividade", field: "Atividade1" },
                            { title: "Tipo da Atividade", field: "TipoAtividade" },
                            { title: "Descricao", field: "Descricao" },
                            { title: "Status", field: "StatusAtividade" },
                            { title: "Data de Entrega", field: "DataEntrega" },                            
                        ]}
                        data={atividades}
                        title="Atividades"
                        onRowClick={(evt, selectedRow) => { props.history.push('/disciplines/details', { ...selectedRow, action: 'Change' }) }}
                    />
                    <div className="form-group mt-3">
                        <button type="button" className="btn btn-primary" onClick={() => toggleModalAtividades()}>Adicionar Atividade</button>
                    </div>
                </div>

            )
        }
        return (
            <div className="d-flex justify-content-center">
                <h3>Lista Vazia</h3>
                <button type="button" className="btn btn-primary" onClick={() => toggleModalAtividades()}>Adicionar Atividade</button>
            </div>
        )
    }

    return (
        <div className="container">
            <h2 className="mb-5">Atividades</h2>
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
            <ModalAtividades displayModalAtividades={displayModalAtividades} toggleModalAtividades={toggleModalAtividades} showErrorSnackBar={showErrorSnackbar}  showSuccessSnackbar={showSuccessSnackbar} setAtividades={setAtividades}/>
            <Snackbars handleClose={handleClose} message={message} openErrorSnackbar={openErrorSnackbar} openSuccessSnackbar={openSuccessSnackbar}/>
        </div>
    );
}
