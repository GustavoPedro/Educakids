import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../../services/api';
import { Formik, Field } from 'formik';

export default function ModalAtividades(props) {
    const { displayModalAtividades, toggleModalAtividades } = props
    const [alunos, setAlunos] = useState([])

    async function onSubmitAtividades() {
        try {

        } catch (e) {

        }
    }

    return (
        <Modal isOpen={displayModalAtividades} toggle={toggleModalAtividades} role="dialog" tabIndex="-1" fade={true}>
            <ModalHeader>Adicionar atividade</ModalHeader>
            <ModalBody>
                <Formik onSubmit={(values, actions) => {
                    onSubmitAtividades(values)
                }}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
                            <Field name="descricao" className="form-control" type="text" placeholder="Descrição" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricao">Tipo de Atividade</label>
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
                </Formik>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleModalAtividades}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </ModalFooter>
        </Modal>
    );
}

ModalAtividades.propTypes = {
    displayModalAtividades: PropTypes.bool,
    toggleModalAtividades: PropTypes.func,
}