import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';
import MaterialTable from "material-table";

export default function List(props) {
    const [atividades, setAtividades] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        fetchAtividades()
    }, [])



    async function fetchAtividades() {
        try {
            setLoading(true)
            const response = await api.get('/api/Atividades')
            const { data } = response
            if (response?.status === 200) {
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
                            { title: "Nome", field: "nome" },
                            { title: "Status", field: "status" },
                            { title: "Data de Entrega", field: "dataEntrega" },
                        ]}
                        data={atividades}
                        title="Atividades"
                        onRowClick={(evt, selectedRow) => { props.history.push('/disciplines/details',{...selectedRow,action: 'Change'})}}
                    />
                    <div className="form-group mt-3">
                        <button type="button" className="btn btn-primary" onClick={() => props.history.push('/disciplines/details',{action:'Add'})}>Adicionar Atividade</button>
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
        </div>
    );
}
