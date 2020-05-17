import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../../services/api';
import { Formik, Field } from 'formik';
import SnackBars from '../../../components/Snackbar';

export default function ModalAtividades(props) {
    const { displayModalAtividades, toggleModalAtividades, showErrorSnackBar, showSuccessSnackbar } = props
    const [alunos, setAlunos] = useState([])
    const [loading, setLoading] = useState(false)

    async function onSubmitAtividades() {
        try {
            setLoading(true)
            const response = await api.post('/api/Atividades')
            if (response?.status === 200) {
                showSuccessSnackbar("Atividade cadastrado com sucesso")
            }
        } catch (e) {
            showErrorSnackBar(e?.response?.data.toString() || "Não foi possível salvar atividade")
        }
    }

    return (
        <Modal isOpen={displayModalAtividades} toggle={toggleModalAtividades} role="dialog" tabIndex="-1" fade={true}>
            <Formik onSubmit={(values, actions) => {
                console.log(values)
                onSubmitAtividades(values)
            }}
            initialValues ={{descricao:'',tipoAtividade: '',premiacao:'',status:'', dataEntrega: Date.now,valorAtividade:0}}>
                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <div>
                        <ModalHeader>Adicionar atividade</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="descricao">Descrição</label>
                                    <Field name="descricao" className="form-control" type="text" placeholder="Descrição" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tipoAtividade">Tipo de Atividade</label>
                                    <Field name="tipoAtividade" className="form-control" as="select" placeholder="Tipo de atividade">
                                        <option>Selecione a matéria</option>
                                        <option value="Moral">Moral</option>
                                        <option value="Ética">Ética</option>
                                        <option value="Solidariedade">Solidariedade</option>
                                        <option value="Auto Controle">Auto Controle</option>
                                    </Field>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="premiacao">Premiação</label>
                                    <Field name="premiacao" className="form-control" type="text" placeholder="Premiação" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="moral">Moral</label>
                                    <Field name="moral" className="form-control" type="text" placeholder="Moral" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <Field name="status" className="form-control" type="text" placeholder="Status" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Data de Entrega">Data de Entrega</label>
                                    <Field name="dataEntrega" className="form-control" type="date" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="valorAtividade">Valor atividade</label>
                                    <Field name="valorAtividade" className="form-control" type="number" />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleModalAtividades}>Cancelar</button>
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </ModalFooter>
                    </div>
                )}
            </Formik>
        </Modal>
    );
}

ModalAtividades.propTypes = {
    displayModalAtividades: PropTypes.bool,
    toggleModalAtividades: PropTypes.func,
    showSuccessSnackbar: PropTypes.func,
    showErrorSnackBar: PropTypes.func
}