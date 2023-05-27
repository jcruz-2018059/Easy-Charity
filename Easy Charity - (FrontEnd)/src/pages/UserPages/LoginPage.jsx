import React from 'react'
import { Link } from "react-router-dom";
import './Login.css'

export const LoginPage = () => {
    return (

        <>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
            </style>
            <section className="h-100 gradient-form  pt-5">
                <div className="container py-5 h-100 rounded-0">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">

                                            <div className="text-center">
                                                <h4 className="mt-1 mb-5 pb-1 pt-5" id='iniciar'>Iniciar Sesión</h4>
                                            </div>

                                            <form>
                                                <p>Agregue sus datos</p>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Usuario</label>
                                                    <input type="email" id="form2Example11" className="form-control" placeholder="Usuario" />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example22">Contraseña</label>
                                                    <input placeholder="Contraseña" type="password" id="form2Example22" className="form-control" />
                                                </div>

                                                <div className="text-center pt-1 mb-5 row">
                                                    <button className="btn btn-danger col rounded-0" type="button">Iniciar sesión</button>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-center pb-4">
                                                    <p className="mb-0 me-2">¿No tienes una cuenta?</p>
                                                    <Link to=''>
                                                        <button type="button" className="btn btn-outline-danger rounded-0">Registrarse</button>
                                                    </Link>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                    <div className="col-lg-6  align-items-center">
                                        <div className="">
                                            <img className='img-fluid' src="\src\assets\osito.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
