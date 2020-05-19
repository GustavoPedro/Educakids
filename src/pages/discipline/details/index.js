import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MaterialTable from "material-table";

const Validacoes = Yup.object().shape({
    materia: Yup.string()
        .max(35, 'O valor inserido excede o comprimento do campo')
        .required('O campo matéria é obrigatório'),
    descricao: Yup.string()
        .required('O campo descrição é obrigatório'),
    turno: Yup.string()
        .max(20, 'O valor inserido excede o comprimento do campo')
        .required('O campo turno é obrigatório'),
    professorResponsavel: Yup.string()
        .required('É obrigatório ter um professor responsável pela matéria')
});

export default function Details(props) {
    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        if (props?.location?.state) {
            const UsuarioDisciplina = props?.location?.state.UsuarioDisciplina
            setAlunos([...UsuarioDisciplina])
        }
    }, [props])

    return (
        <div className="container">
            <Formik
                initialValues={{
                    materia: props?.location?.state?.mateira || "",
                    descricao: props?.location?.state?.descricao || "",
                    turno: props?.location?.state?.turno || "",
                    professorResponsavel: props?.location?.state?.professorResponsavel || "",
                }}
                validationSchema={Validacoes}
            >
                {({ errors, touched, values, handleChange, handleBlur }) => (
                    <form key={values.materia}>
                        <div className="form-group">
                            <label for="materia">Matéria</label>
                            <input
                                type="text"
                                id="materia"
                                className="form-control"
                                value={values.materia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {console.log(errors)}
                            {errors.materia && touched.materia ? (
                                <div className="text-danger">{errors.materia}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label for="descricao">Descrição</label>
                            <input
                                type="text"
                                id="descricao"
                                className="form-control"
                                value={values.descricao}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.descricao && touched.descricao ? (
                                <div className="text-danger">{errors.descricao}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label for="turno">Turno</label>
                            <input
                                type="text"
                                id="turno"
                                className="form-control"
                                value={values.turno}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.turno && touched.turno ? (
                                <div className="text-danger">{errors.turno}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label for="respProf">Professor responsável</label>
                            <input
                                type="text"
                                id="respProf"
                                className="form-control"
                                value={values.professorResponsavel}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.professorResponsavel && touched.professorResponsavel ? (
                                <div>{errors.professorResponsavel}</div>
                            ) : null}
                        </div>
                        <h2 className="mb-5">Alunos</h2>
                        <MaterialTable
                            columns={[
                                { title: "Nome", field: "Nome" },
                            ]}
                            data={alunos}
                            title="Alunos"
                            onRowClick={(evt, selectedRow) => { console.log(props); props.history.push('/disciplines/details', selectedRow) }}
                        />
                        <div className="mt-4">
                            <button type="button" className="btn btn-primary mr-4" data-toggle="modal" data-target="#exampleModal">
                                Adicionar Alunos na disciplina
            </button>
                            <button type="button" className="btn btn-primary mr-4" data-toggle="modal" data-target="#exampleModal2">
                                Adicionar Professor na disciplina
            </button>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
                                Salvar
            </button>
                        </div>
                    </form>
                )}
            </Formik>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Alunos</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>
                                            <a href="disciplina_details.html">Mark</a>
                                        </td>
                                        <td>+</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td><a href="disciplina_details.html">Mark</a> </td>
                                        <td>+</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td><a href="disciplina_details.html">Mark</a></td>
                                        <td>+</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel2">Professores</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>
                                            <a href="disciplina_details.html">Mark</a>
                                        </td>
                                        <td>+</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td><a href="disciplina_details.html">Mark</a> </td>
                                        <td>+</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td><a href="disciplina_details.html">Mark</a></td>
                                        <td>+</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
