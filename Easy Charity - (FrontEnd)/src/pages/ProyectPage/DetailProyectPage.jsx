import React from 'react'

export const DetailProyectPage = () => {
  return (
    <>
            <h1 style={{textAlign: 'left'}}>Proyectos Solidarios</h1>
           <div style={{backgroundColor: 'red', textAlign: 'left', height: 10, width: 500, borderRadius: 50}}></div>
            <br />

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                        <img className="card-img-top" src="https://search-drive.com/wp-content/uploads/2023/04/valores-reales-scaled.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 style={{textAlign: 'left'}} className="card-title">Contribución</h5>
                            <p style={{color: 'darkcyan', textAlign: 'justify'}} className="card-text">Se ofrece la ayuda es necesaria.</p>
                            <button style={{width: 300}} className="btn btn-danger">Ver más</button>
                        </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                    <div className="card">
                        <img className="card-img-top" src="https://fotos.perfil.com/2022/06/08/trim/987/555/hambre-en-amba-1368926.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 style={{textAlign: 'left'}} className="card-title">Alimentos para familias</h5>
                            <p style={{color: 'darkcyan', textAlign: 'justify'}} className="card-text">Se ofrece comida para las familias necesitadas.</p>
                            <button style={{width: 300}} className="btn btn-danger">Ver más</button>
                        </div>
                        </div>
                    </div>
                </div>
        </>
  )
}
