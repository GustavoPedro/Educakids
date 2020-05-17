import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import MaterialTable from "material-table";
import ModalAlunos from '../components/modal_alunos';
import api from '../../../services/api';
import Snackbars from '../../../components/Snackbar'

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
    const [id, setId] = useState(props?.location?.state?.id)
    const [professores, setProfessores] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [action, setAction] = useState(props?.location?.state?.action);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    const [message, setMessage] = useState("");
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    };

    function showErrorSnackbar(message) {
        setMessage(message)
        setOpenSuccessSnackbar(false)
        setOpenErrorSnackbar(true)
    }
    function showSuccessSnackbar(message) {
        setMessage(message)
        setOpenErrorSnackbar(false)
        setOpenSuccessSnackbar(true)
    }

    async function onSubmit(disciplina, actions) {
        setLoading(true)
        try {
            console.log(action)
            if (action === 'Add') {
                const response = await api.post('/api/Disciplina', disciplina)
                if (response?.status === 201) {
                    const { data } = response
                    setId(data.IdDisciplina)
                    setAction('Change');
                    showSuccessSnackbar('Disciplina Salva com Sucesso')
                }
            }
            if (action === 'Change') {
                disciplina.IdDisciplina = id
                const response = await api.put(`/api/Disciplina/${id}`, disciplina)
                console.log(response)

                if (response?.status === 200) {
                    showSuccessSnackbar('Disciplina Salva com Sucesso')
                }
            }
        } catch (e) {
            console.log(e)
            showErrorSnackbar(e?.response?.data.toString())
        } finally {
            setLoading(false)
            actions.setSubmitting(false);
        }
    }

    function deleteAluno(event, rowData) {
        setAlunos(alunos.filter((aluno) => aluno.Cpf != rowData.Cpf))
    }

    return (
        <div className="container">
            <Formik
                initialValues={{
                    descricao: props?.location?.state?.descricao || "",
                    materia: props?.location?.state?.mateira || "",
                    turno: props?.location?.state?.turno || "",
                    cpf: professorResponsavel?.Cpf || "",
                }}
                onSubmit={(values, actions) => {
                    const usuarioDisciplina = alunos.map(aluno => {
                        return { UsuarioCpf: aluno.Cpf, DisciplinaIdDisciplina: id || 0 }
                    });
                    usuarioDisciplina.push({ UsuarioCpf: values.cpf })

                    const disciplina = { ...values, usuarioDisciplina, DisciplinaIdDisciplina: id || 0 }
                    onSubmit(disciplina, actions)
                }}
                validationSchema={Validacoes}
            >
                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
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
                        <label htmlFor="materia">Matéria</label>
                            <Field name="materia" as="select" placeholder="Matéria">
                                <option>Selecione a matéria</option>
                                {props?.location?.state?.mateira === "Ensino Religioso" ? <option selected value="Ensino Religioso">Ensino Religioso</option> : <option value="Ensino Religioso">Ensino Religioso</option>}
                                {props?.location?.state?.mateira == "Ética" ? <option selected value="Ética">Ética</option> : <option value="Ética">Ética</option>}
                                {props?.location?.state?.mateira == "Educação fisica" ? <option selected value="Educação fisica">Educação fisica</option> : <option value="Educação fisica">Educação fisica</option>}
                                {props?.location?.state?.mateira == "História" ? <option selected value="História">História</option> : <option value="História">História</option>}
                                {props?.location?.state?.mateira == "Portugues" ? <option selected value="Portugues"> Portugues</option> : <option value="Portugues">Portugues</option>}
                                {props?.location?.state?.mateira == "Ciências" ? <option selected value="Ciências">Ciências</option> : <option value="Ciências">Ciências</option>}
                            </Field>
                            {errors.materia && touched.materia ? (
                                <div className="text-danger">{errors.materia}</div>
                            ) : null}
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
                                    onClick: (event, rowData) => deleteAluno(event, rowData)
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
                            <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" >
                                {!loading ? "Salvar" : "Salvando..."}
                            </button>
                        </div>
                    </form>
                )}

            </Formik>
            <ModalAlunos displayModalAlunos={displayModalAlunos} toggleModalAlunos={toggleModalAlunos} setAlunosDisciplina={setAlunos} alunosDisciplina={[...alunos]} />
            <Snackbars handleClose={handleClose} openErrorSnackbar={openErrorSnackbar} openSuccessSnackbar={openSuccessSnackbar} message={message} />
        </div >
    );
}
