import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';
import MaterialTable from "material-table";

export default function List() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        fetchDisciplinas()
    }, [])



    async function fetchDisciplinas() {
        try {
            setLoading(true)
            const response = await api.get('/api/Disciplina')
            const { data } = response
            if (response.status === 200) {
                setDisciplinas([...data])
            }
            else {
                setErrorMessage(data)
            }
        } catch (error) {
            setErrorMessage(error)
        }
        finally {
            setLoading(false)
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
                        ]}
                        data={disciplinas}
                        title="Disciplinas"
                        onRowClick={(evt, selectedRow) => console.log(selectedRow)}
                    />
                    <div class="form-group mt-3">
                        <button type="button" class="btn btn-primary">Adicionar Disciplina</button>
                    </div>
                </div>

            )
        }
        return (
            <div class="d-flex justify-content-center">
                <h3>Lista Vazia</h3>
            </div>
        )
    }

    return (
        <div class="container">
            <h2 class="mb-5">Disciplinas</h2>
            {
                errorMessage ? (
                    <div class="alert alert-danger" role="alert">
                        Não foi possível buscar lista de usuários pelo seguinte motivo: {errorMessage}
                    </div>
                ) : !isLoading ? renderTable() : (
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
