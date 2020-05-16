import React from 'react';


function Activities(props) {
    return (
    <div>
        <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Descrição</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            value="Dar comida pro cachorro"/>
        /</div>
        <div class="form-group">
          <label for="exampleInputEmail1">Tipo de atividade</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Moral</option>
            <option>Ética</option>
            <option>Solidariedade</option>
            <option>Auto Controle</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Premiação</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="Rascunho"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Moral da Atividade</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="Rascunho"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Status</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="Rascunho"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Data</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="30/11/1999"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Valor</label>
          <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="15"/>
        </div>
      </form>
  </div>);
}

export default details;