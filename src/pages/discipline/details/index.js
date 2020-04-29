import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MaterialTable from "material-table";
import ModalAlunos from '../components/modal_alunos';
import ModalProfessores from '../components/modal_professores';

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
    const [displayModalAlunos, setDisplayModalAlunos] = useState(false)
    const [displayModalProfessores, setDisplayModalProfessores] = useState(false);
    const toggleModalAlunos = () => setDisplayModalAlunos(!displayModalAlunos);
    const toggleModalProfessores = () => setDisplayModalProfessores(!displayModalProfessores);

    useEffect(() => {
        function setAlunosNaDisciplina() {
            if (props?.location?.state) {
                const UsuarioDisciplina = props?.location?.state.UsuarioDisciplina
                setAlunos([...UsuarioDisciplina])
            }
        }
        setAlunosNaDisciplina()
    }, [])

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
                    <form>
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
                                { title: "Nome", field: "NomeSobrenome" },
                            ]}
                            data={alunos}
                            title="Alunos"
                            onRowClick={(evt, selectedRow) => { props.history.push('/disciplines/details', selectedRow) }}
                        />
                        <div className="mt-4">
                            <button type="button" className="btn btn-primary mr-4" data-toggle="modal" data-target="#exampleModal" onClick={() => toggleModalAlunos()}>
                                Adicionar Alunos na disciplina
            </button>
                            <button type="button" className="btn btn-primary mr-4" data-toggle="modal" data-target="#exampleModal2" onClick={() => toggleModalProfessores(true)}>
                                Adicionar Professor na disciplina
            </button>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
                                Salvar
            </button>
                        </div>
                        <ModalAlunos displayModalAlunos={displayModalAlunos} toggleModalAlunos={toggleModalAlunos} setAlunosDisciplina={setAlunos} alunosDisciplina={[...alunos]} />
                    </form>
                )}

            </Formik>

            <ModalProfessores displayModalProfessores={displayModalProfessores} toggleModalProfessores={toggleModalProfessores} />

        </div>
    );
}
