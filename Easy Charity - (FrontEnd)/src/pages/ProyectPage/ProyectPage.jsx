import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const ProyectPage = () => {
  return (
      <>
      <Outlet></Outlet>
      <div className='title'>
                <h1 style={{color: '#e91c1caa'}} className='text-center pt-5 pb-5'>Proyectos</h1>
            </div>

                <div className='mb-5 d-flex justify-content-between'>
                    <Link to=''>
                        <button style={{width: 200}} className='btn btn-danger'>Agregar</button>
                    </Link>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                        <img className="card-img-top" src="https://search-drive.com/wp-content/uploads/2023/04/valores-reales-scaled.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 style={{textAlign: 'left'}} className="card-title">Contribución</h5>
                            <p style={{color: 'darkcyan', textAlign: 'justify'}} className="card-text">Se ofrece la ayuda es necesaria.</p>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <button style={{width: 200}} className="btn btn-danger">Ver más</button>
                                </div>
                                <div className="form-group col-md-3">
                                    <Link to=''>
                                        <button style={{width: 200}} className="btn btn-danger">Editar</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                    <div className="card">
                        <img className="card-img-top" src="https://fotos.perfil.com/2022/06/08/trim/987/555/hambre-en-amba-1368926.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 style={{textAlign: 'left'}} className="card-title">Alimentos para familias</h5>
                            <p style={{color: 'darkcyan', textAlign: 'justify'}} className="card-text">Se ofrece comida para las familias necesitadas.</p>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <button style={{width: 200}} className="btn btn-danger">Ver más</button>
                                </div>
                                <div className="form-group col-md-3">
                                    <Link to=''>
                                        <button style={{width: 200}} className="btn btn-danger">Editar</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
      </>
  )
}
