import api from '../../../services/api';
import './styles.js';
import MaterialTable from "material-table";
import Snackbars from '../../../components/Snackbar'
import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded'
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import useStyles from './styles';
import IconButton from '@material-ui/core/IconButton';

export default function List(props) {
    const [disciplinas, setDisciplinas] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    const [message, setMessage] = useState("");
    const [selectedValueDisciplina, setSelectedValueDisciplina] = useState({});
    const classes = useStyles();

    useEffect(() => {
        fetchDisciplinas()
    }, [])

    const handleOpenDialog = () => {
        setOpen(true)
    }


    const handleCloseDialog = () => {
        setOpen(false);
    };


    function showErrorSnackbar(message) {
        setMessage(message)
        setOpenErrorSnackbar(true)
    }
    function showSuccessSnackbar(message) {
        setMessage(message)
        setOpenSuccessSnackbar(true)
    }

    async function fetchDisciplinas() {
        try {
            setLoading(true)
            const response = await api.get('/api/Disciplina')
            const { data } = response
            if (response?.status === 200) {
                setDisciplinas([...data])
            }
            else {
                showErrorSnackbar(data.toString())
            }
        } catch (error) {
            showErrorSnackbar(error.toString())
        }
        finally {
            setLoading(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    };

    async function deleteDisciplina(event, rowData) {
        try {
            const response = await api.delete(`/api/Disciplina/${rowData?.id}`)
            if (response?.status == 200) {
                showSuccessSnackbar("Disciplina deletada com sucesso")
                setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== rowData.id))
            }
        } catch (e) {
            console.log(e?.response?.data)
            showErrorSnackbar(e?.response?.data.toString())
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
                            { title: "Professor Responsável", field: "professorResponsavel.NomeSobrenome" },
                        ]}
                        data={disciplinas}
                        actions={[
                            {
                                icon: 'delete',
                                tooltip: 'Deletar disciplina',
                                onClick: (event, rowData) => deleteDisciplina(event, rowData)
                            },
                            {
                                icon: 'edit',
                                tooltip: 'Editar disciplina',
                                onClick: (event, rowData) => props.history.push('/disciplines/details', { ...rowData, action: 'Change' })
                            },
                            {
                                icon: 'add',
                                tooltip: 'Adicionar disciplina',
                                isFreeAction:true,
                                onClick: (event, rowData) => props.history.push('/disciplines/details', { action: 'Add' })
                            }
                        ]}
                        title="Disciplinas"
                        onRowClick={(evt, selectedRow) => {
                            setSelectedValueDisciplina(selectedRow);
                            handleCloseDialog()
                        }}
                    />
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
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '70vh' }}
            >
                <CssBaseline />
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <Input className={classes.input} placeholder="Selecione a Disciplina" value={selectedValueDisciplina?.descricao || ""} inputProps={{ 'aria-label': 'description' }} />
                        <Fab color="secondary" onClick={handleOpenDialog}>
                            <SearchIcon />
                        </Fab>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Fab color="secondary" onClick={() => props.history.push('/activities', { disciplina: selectedValueDisciplina })}>
                        <ArrowRightRoundedIcon />
                    </Fab>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                {renderTable()}
            </Dialog>
            <Snackbars handleClose={handleClose} openErrorSnackbar={openErrorSnackbar} openSuccessSnackbar={openSuccessSnackbar} message={message}/>
        </div>
    );
}