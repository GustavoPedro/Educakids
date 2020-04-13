import React from 'react';

import './styles.css';

export default function Home() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <h1 className="my-4">Bem vindo, <small> Gustavo!</small></h1>

            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Post Title</h2>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
                <a href="#" className="btn btn-primary">Read More &rarr;</a>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card my-4">
              <h5 className="card-header">Editar dados</h5>
              <div className="card-body">
                <input type="text" className="form-control mb-2" value={'Gustavo Miranda'} />
                <input type="text" className="form-control mb-2" value={'gustavo-mv@outlook.com'} />
                <input type="text" className="form-control mb-2" value={'(31) 997872268'} />
                <button type="button" className="btn btn-primary w-100">Salvar</button>

              </div>
            </div>
              <div className="card my-4">
                <h5 className="card-header">Trocar senha</h5>
                <div className="card-body">
                  <input type="password" className="form-control mb-2" placeholder='Nova senha' />
                  <button type="button" className="btn btn-primary w-100">Salvar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}