import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import MaterialTable from "material-table";
import ModalAlunos from '../components/modal_alunos';
import api from '../../../services/api';

const Validacoes = Yup.object().shape({
    materia: Yup.string()
        .max(35, 'O valor inserido excede o comprimento do campo')
        .required('O campo matéria é obrigatório'),
    descricao: Yup.string()
        .required('O campo descrição é obrigatório'),
    turno: Yup.string()
        .max(20, 'O valor inserido excede o comprimento do campo')
        .required('O campo turno é obrigatório'),
    cpf: Yup.string()
        .required('É obrigatório ter um professor responsável pela matéria')
});

export default function Details(props) {
    const [alunos, setAlunos] = useState([])
    const [displayModalAlunos, setDisplayModalAlunos] = useState(false)
    const [displayModalProfessores, setDisplayModalProfessores] = useState(false);
    const [professorResponsavel, setProfessorResponsavel] = useState(props?.location?.state?.professorResponsavel);
    const [professores, setProfessores] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const action = props?.location?.state?.action;
    const toggleModalAlunos = () => setDisplayModalAlunos(!displayModalAlunos);
    const toggleModalProfessores = () => setDisplayModalProfessores(!displayModalProfessores);


    useEffect(() => {
        async function fetchProfessores() {
            try {
                setLoading(true)
                const response = await api.get('/api/Professores')
                const { data } = response
                if (response.status === 200) {
                    setProfessores([...data])
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
        function setAlunosNaDisciplina() {
            if (props?.location?.state) {
                const UsuarioDisciplina = props?.location?.state?.UsuarioDisciplina
                if (UsuarioDisciplina) {
                    setAlunos([...UsuarioDisciplina])
                }

            }
        }
        setAlunosNaDisciplina()
        fetchProfessores()
    }, [])

    async function onSubmit(disciplina, actions) {
        console.log(disciplina)
        setLoading(true)
        try {
            console.log(action)
            if (action === 'Add') {
                const response = await api.post('/api/Disciplina', disciplina)
                if (response?.status === 201) {
                    alunos.pop()
                    alert('Disciplina Salva com Sucesso')
                }
            }
            if (action === 'Change') {
                const response = await api.post('/api/Disciplina', disciplina)
                if (response?.status === 201) {
                    alunos.pop()
                    alert('Disciplina Salva com Sucesso')
                }
            }
        } catch (error) {
            console.log(error)
            alert('Não foi possível salvar disciplina')
        } finally {
            setLoading(false)
            actions.setSubmitting(false);
        }
    }

    return (
        <div className="container">
            {!loading ? <Formik
                initialValues={{
                    materia: props?.location?.state?.mateira || "",
                    descricao: props?.location?.state?.descricao || "",
                    turno: props?.location?.state?.turno || "",
                    cpf: professorResponsavel?.Cpf || "",
                }}
                onSubmit={(values, actions) => {
                    console.log('opa')
                    delete values.professorResponsavel
                    alunos.push({ Cpf: values.cpf })
                    const disciplina = { ...values, alunos }
                    onSubmit(disciplina, actions)
                }}
                validationSchema={Validacoes}
            >
                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
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
                            {errors && console.log(errors)}
                        </div>
                        <div className="form-group">
                            <label>Turno</label>
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
                            <label htmlFor="respProf">Professor responsável</label>
                            <Field name="cpf" as="select" placeholder="Professor responsável">
                                <option value="" >Selecione um professor</option>
                                {professores && professores.map(professor => professor?.Cpf === professorResponsavel?.Cpf ? <option key={professor?.Cpf} value={professor?.Cpf} selected>{professor?.NomeSobrenome}</option> : <option key={professor?.Cpf} value={professor?.Cpf}>{professor?.NomeSobrenome}</option>)}
                            </Field>
                            {errors.cpf && touched.cpf ? (
                                <div>{errors.cpf}</div>
                            ) : null}
                        </div>
                        <h2 className="mb-5">Alunos</h2>
                        <MaterialTable
                            columns={[
                                { title: "Nome", field: "NomeSobrenome" },
                            ]}
                            actions={[
                                {
                                    icon: 'delete',
                                    tooltip: 'Deletar aluno',
                                    onClick: (event, rowData) => setAlunos(alunos.filter((aluno) => aluno.Cpf != rowData.Cpf))
                                }
                            ]}
                            data={alunos}
                            title="Alunos"
                            onRowClick={(evt, selectedRow) => { props.history.push('/disciplines/details', selectedRow) }}
                        />
                        <div className="mt-4">
                            <button type="button" className="btn btn-primary mr-4" data-toggle="modal" data-target="#exampleModal" onClick={() => toggleModalAlunos()}>
                                Adicionar Alunos na disciplina
            </button>
                            <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
                                Salvar
            </button>
                        </div>
                    </form>
                )}

            </Formik>
                : <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
            <ModalAlunos displayModalAlunos={displayModalAlunos} toggleModalAlunos={toggleModalAlunos} setAlunosDisciplina={setAlunos} alunosDisciplina={[...alunos]} />
            {alunos.map((e) => <p>{e?.Cpf}</p>)}
        </div>
    );
}
