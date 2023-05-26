import React from 'react'
import { Link } from "react-router-dom";
import './Register.css'

export const RegisterPage = () => {
  return (
    <>
        <section className="">
                <div className="container py-5 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                        <div className="row g-0">
                            <div className="col-xl-6 d-none d-xl-block ">
                            <img id="kinal" src={kinal}
                                alt="Sample photo" className="img-fluid"/>
                            </div>
                            <div className="col-xl-6">
                            <div className="card-body p-md-5 text-black">
                                <h3 className="mb-5 text-uppercase">Registrarse</h3>

                                <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                    <input placeholder="Nombre" type="text" id="form3Example1m" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="form3Example1m">Nombres</label>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                    <input placeholder="Apellidos" type="text" id="form3Example1n" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="form3Example1n">Apellidos</label>
                                    </div>
                                </div>
                                </div>

                                <div className="form-outline mb-4">
                                <input placeholder="Correo" type="text" id="form3Example9" className="form-control form-control-lg" />
                                <label className="form-label" htmlFor="form3Example9">Correo</label>
                                </div>

                                <div className="form-outline mb-4">
                                <input placeholder="Contraseña" type="password" id="form3Example8" className="form-control form-control-lg" />
                                <label className="form-label" htmlFor="form3Example8">Contraseña</label>
                                </div>

                                <div className="text-center pt-3">
                                <button type="button" className="btn btn-light btn-lg">Cancelar</button>
                                <Link to='/'>
                                <button type="button" className="btn btn-danger btn-lg ms-2">Registrarse</button>
                                </Link>
                                </div>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
         </section>
        </>
  )
}
