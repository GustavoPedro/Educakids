import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './styles.css';

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
            if (response.status == 200) {
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
        let rownumber = 0;
        if (disciplinas) {
            return (
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Materia</th>
                            <th scope="col">Descricao</th>
                            <th scope="col">Turno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map(disc => (
                            <tr key={disc.id}>
                                <td scope="row">{rownumber++}</td>
                                <td><a href="disciplina_details.html">{disc.materia}</a></td>
                                <td>{disc.descricao}</td>
                                <td>{disc.turno}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            <h2>Disciplinas</h2>
            <div class="md-form mt-5 mb-5">
                <input class="form-control" type="text" placeholder="Pesquisar" aria-label="Search" />
            </div>
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
