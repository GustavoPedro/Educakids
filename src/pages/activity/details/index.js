import React,{useState} from 'react';
import { Formik, Field } from 'formik';
import LabelError from '../../../components/LabelError/';
import * as Yup from 'yup';
import api from '../../../services/api';
import Snackbars from '../../../components/Snackbar'
import PropTypes from 'prop-types';

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

function ActivitiesDetails({atividadeDetails}) {
  const [loading, setLoading] = useState(false)
  const [atividade,setAtividade] = useState(atividadeDetails)
  const [message,setMessage] = useState('')
  const [openSuccessSnackbar,setOpenSuccessSnackbar] = useState(false)
  const [openErrorSnackbar,setOpenErrorSnackbar] = useState(false)

  
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

  async function onSubmitAtividade(values) {
    try {
      setLoading(true)
      values.IdAtividade = atividade.IdAtividade
      values.IdDisciplina = atividade.disciplina.id
      const response = await api.put(`api/Atividades/${atividade.IdAtividade}`,values);
      if (response?.status === 200) {
        showSuccessSnackbar(response?.data?.msg)
      }
    } catch (error) {
      console.log(error)
      showErrorSnackbar(error?.response?.data?.msg  || "Não foi possível salvar atividade")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <Formik
        validationSchema={Validacoes}
        onSubmit={(values, actions) => {
          console.log(values)
          onSubmitAtividade(values)
        }}
        initialValues={{ Descricao: atividade.Descricao , MoralAtividade: atividade.MoralAtividade, TipoAtividade: atividade.TipoAtividade, Atividade1: atividade.Atividade1, Premiacao: atividade.Premiacao, StatusAtividade: atividade.StatusAtividade, DataEntrega: new Date(atividade.DataEntrega).toISOString().substr(0,10), Valor: atividade.Valor }}>
        {({ errors, handleSubmit }) => (
          <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Atividade1">Atividade</label>
                  <Field name="Atividade1" className="form-control" type="text" placeholder="atividade" />
                </div>
                {errors?.Atividade1 && <LabelError error={errors.Atividade1} />}
                <div className="form-group">
                  <label htmlFor="Descricao">Descrição</label>
                  <Field name="Descricao" className="form-control" type="text" placeholder="Descrição" />
                </div>
                {errors?.Descricao && <LabelError error={errors.Descricao} />}
                <div className="form-group">
                  <label htmlFor="TipoAtividade">Tipo de Atividade</label>
                  <Field name="TipoAtividade" className="form-control" as="select">
                    <option value="Moral">Moral</option>
                    <option value="Ética">Ética</option>
                    <option value="Solidariedade">Solidariedade</option>
                    <option value="Auto Controle">Auto Controle</option>
                  </Field>
                </div>
                {errors?.TipoAtividade && <LabelError error={errors.TipoAtividade} />}
                <div className="form-group">
                  <label htmlFor="Premiacao">Premiação</label>
                  <Field name="Premiacao" className="form-control" type="text" placeholder="Premiação" />
                </div>
                {errors?.Premiacao && <LabelError error={errors.Premiacao} />}
                <div className="form-group">
                  <label htmlFor="MoralAtividade">Moral</label>
                  <Field name="MoralAtividade" className="form-control" type="text" placeholder="Moral" />
                </div>
                {errors?.MoralAtividade && <LabelError error={errors.MoralAtividade} />}
                <div className="form-group">
                  <label htmlFor="StatusAtividade">Status</label>
                  <Field name="StatusAtividade" className="form-control" as="select">
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                  </Field>
                </div>
                {errors?.StatusAtividade && <LabelError error={errors.StatusAtividade} />}
                <div className="form-group">
                  <label htmlFor="DataEntrega">Data de Entrega</label>
                  <Field name="DataEntrega" className="form-control" type="date" />
                </div>
                {errors?.DataEntrega && <LabelError error={errors.DataEntrega} />}
                <div className="form-group">
                  <label htmlFor="Valor">Valor atividade</label>
                  <Field name="Valor" className="form-control" type="number" />
                </div>
                {errors?.Valor && <LabelError error={errors.Valor} />}
                <input type="submit" className="btn btn-primary" value={loading ? "Salvando..." : "Salvar"} disabled={loading} />
            </form>
          </div>
        )}
      </Formik>
      <Snackbars handleClose={handleClose} message={message} openSuccessSnackbar={openSuccessSnackbar} openErrorSnackbar={openErrorSnackbar}/>
    </div>
  );
}

ActivitiesDetails.propTypes = {
  atividadeDetails: PropTypes.object.isRequired,
  disciplina: PropTypes.object
}

export default ActivitiesDetails;
