import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import PropTypes from 'prop-types';

export default function AlunosAtividade({ atividadeDetails }) {

    const [alunos, setAlunos] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchAlunos(params) {
            setLoading(true)
            setAlunos([{
                'Nome': 'Gustavo',
                'Status': 'Pendente',
                'Nota': 0
            }, {
                'Nome': 'Pedro',
                'Status': 'Pendente',
                'Nota': 0
            }, {
                'Nome': 'Souza',
                'Status': 'Entregue',
                'Nota': 0
            },])
            setLoading(false)
        }
        fetchAlunos()
    }, [])

    return (
        <div>
            {!loading ? (
                <MaterialTable
                    columns={[
                        { title: "Aluno", field: "Nome" },
                        { title: "Status", field: "Status" },
                        { title: "Nota", field: "Nota" },
                    ]}
                    data={alunos}
                    title="Alunos Designados"
                    editable={{
                        isEditable: rowdata => rowdata.Status == "Entregue",
                        onRowUpdate: (newData, oldData) => {
                            console.log(oldData)
                        }
                    }}
                />
            ) : (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)

            }
        </div>
    );
}
AlunosAtividade.propTypes = {
    atividadeDetails: PropTypes.object.isRequired,
}