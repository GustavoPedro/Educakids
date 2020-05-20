import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../../services/api';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import LabelError from '../../../components/LabelError/';

const Validacoes = Yup.object().shape({
    Descricao: Yup.string(),
    MoralAtividade: Yup.string()
        .max(45, 'O valor inserido excede o comprimento do campo')
        .required('O campo moral da atividade é obrigatório'),
    TipoAtividade: Yup.string().max(45, "O valor inserido excede o comprimento do campo").required("O campo tipo da atividade é obrigatório"),
    Atividade1: Yup.string()
    .max(30,"O valor inserido excede o comprimento do campo")
    .required("O campo atividade é obrigatório"),
    Premiacao: Yup.string().max(45,"O valor inserido excede o comprimento do campo"),
    DataEntrega: Yup.date(),
    Valor: Yup.string().max(20,"O valor inserido excede o comprimento do campo").required("O campo valor é obrigatório")
});

export default function ModalAtividades(props) {
    const { displayModalAtividades, toggleModalAtividades, showErrorSnackBar, showSuccessSnackbar, setAtividades } = props
    const [loading, setLoading] = useState(false)

    async function onSubmitAtividades(values) {
        try {
            setLoading(true)
            const response = await api.post('/api/Atividades', values)
            if (response?.status === 200) {
                showSuccessSnackbar(response?.data?.msg)
                setAtividades((prevstate => {
                    const atividades = [...prevstate]
                    values.IdAtividade = response?.data?.IdAtividade
                    atividades.push(values)
                    return atividades
                }))
                toggleModalAtividades()
            }
        } catch (e) {
            console.log(e)
            showErrorSnackBar(e?.response?.data?.msg || "Não foi possível salvar atividade")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Modal isOpen={displayModalAtividades} toggle={toggleModalAtividades} role="dialog" tabIndex="-1" fade={true}>
            <ModalHeader>Adicionar atividade</ModalHeader>
            <Formik 
            validationSchema={Validacoes}
            onSubmit={(values, actions) => {
                console.log(values)
                onSubmitAtividades(values)
            }}
                initialValues={{ Descricao: '', MoralAtividade: '', TipoAtividade: '', Atividade1: '', Premiacao: '', StatusAtividade: '', DataEntrega: '', Valor: 0 }}>
                {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="Atividade1">Atividade</label>
                                    <Field name="Atividade1" className="form-control" type="text" placeholder="atividade" />
                                </div>
                                {errors?.Atividade1 && <LabelError error={errors.Atividade1}/> }
                                <div className="form-group">
                                    <label htmlFor="Descricao">Descrição</label>
                                    <Field name="Descricao" className="form-control" type="text" placeholder="Descrição" />
                                </div>
                                {errors?.Descricao && <LabelError error={errors.Descricao}/> }
                                <div className="form-group">
                                    <label htmlFor="TipoAtividade">Tipo de Atividade</label>
                                    <Field name="TipoAtividade" className="form-control" as="select" placeholder="Tipo de atividade">
                                        <option>Selecione a matéria</option>
                                        <option value="Moral">Moral</option>
                                        <option value="Ética">Ética</option>
                                        <option value="Solidariedade">Solidariedade</option>
                                        <option value="Auto Controle">Auto Controle</option>
                                    </Field>
                                </div>
                                {errors?.TipoAtividade && <LabelError error={errors.TipoAtividade}/> }
                                <div className="form-group">
                                    <label htmlFor="Premiacao">Premiação</label>
                                    <Field name="Premiacao" className="form-control" type="text" placeholder="Premiação" />
                                </div>
                                {errors?.Premiacao && <LabelError error={errors.Premiacao}/> }
                                <div className="form-group">
                                    <label htmlFor="MoralAtividade">Moral</label>
                                    <Field name="MoralAtividade" className="form-control" type="text" placeholder="Moral" />
                                </div>
                                {errors?.MoralAtividade && <LabelError error={errors.MoralAtividade}/> }
                                <div className="form-group">
                                    <label htmlFor="StatusAtividade">Status</label>
                                    <Field name="StatusAtividade" className="form-control" as="select">
                                        <option value="Pendente">Pendente</option>
                                        <option value="Em andamento">Em andamento</option>
                                    </Field>
                                </div>
                                {errors?.StatusAtividade && <LabelError error={errors.StatusAtividade}/> }
                                <div className="form-group">
                                    <label htmlFor="DataEntrega">Data de Entrega</label>
                                    <Field name="DataEntrega" className="form-control" type="date" />
                                </div>
                                {errors?.DataEntrega && <LabelError error={errors.DataEntrega}/> }
                                <div className="form-group">
                                    <label htmlFor="Valor">Valor atividade</label>
                                    <Field name="Valor" className="form-control" type="number" />
                                </div>
                                {errors?.Valor && <LabelError error={errors.Valor}/> }
                            </ModalBody>
                            <ModalFooter>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleModalAtividades}>Cancelar</button>
                                <input type="submit" className="btn btn-primary" value={loading ? "Salvando..." : "Salvar"} disabled={loading} />
                            </ModalFooter>
                        </form>
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
    showErrorSnackBar: PropTypes.func,
    setAtividades: PropTypes.func
}