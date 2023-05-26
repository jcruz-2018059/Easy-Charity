import React from 'react'
import { Link } from "react-router-dom";
import './Login.css'

export const LoginPage = () => {
  return (
      
      <>
        <section className="h-100 gradient-form">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-6">
                            <div className="card-body p-md-5 mx-md-4">

                                <div className="text-center">
                                <img src="https://camo.githubusercontent.com/09fe474f27e7ee825551f10be0684371cd5ffc58b047419066947f4f0e0074c7/68747470733a2f2f692e696d6775722e636f6d2f784138523075572e706e67"
                                    style={{width: "185px"}} alt="logo"/>
                                <h4 className="mt-1 mb-5 pb-1">Easy Charity</h4>
                                </div>

                                <form>
                                <p>Agrege sus datos</p>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form2Example11" className="form-control"
                                    placeholder="Coloque su usuario" />
                                    <label className="form-label" htmlFor="form2Example11">Usuario</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input placeholder="Coloque su contraseña" type="password" id="form2Example22" className="form-control" />
                                    <label className="form-label" htmlFor="form2Example22">Contraseña</label>
                                </div>

                                <div className="text-center pt-1 mb-5 pb-1">
                                    <button className="btn text-center btn-block fa-lg gradient-custom-2 mb-3" type="button">Log
                                    in</button>
                                </div>

                                <div className="d-flex align-items-center justify-content-center pb-4">
                                    <p className="mb-0 me-2">¿No tienes una cuenta?</p>
                                    <Link to=''>
                                    <button type="button" className="btn btn-outline-danger">Registrarse</button>
                                    </Link>
                                </div>

                                </form>

                            </div>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 className="mb-4">We are more than just a company</h4>
                                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
