import React from 'react'
import { Link } from 'react-router-dom'

export const AddUserPage = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 20 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                                    <h1 className=" card-title ">Agregar Usuario</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                    <div className="card-body">
                                        <form className="row g-4 needs-validation" noValidate>
                                            <div className="col-12">
                                                <label htmlFor="fn" className="form-label fs-base">Nombre</label>
                                                <input type="text" className="form-control form-control-lg" id="fn" required />
                                                <div className="invalid-feedback">Please enter your full name!</div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="email" className="form-label fs-base">Apellido</label>
                                                <input type="email" className="form-control form-control-lg" id="email" required />
                                                <div className="invalid-feedback">Please provide a valid email address!</div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="" className="form-label fs-base">Nombre de Usuario</label>
                                                <input type="text" className="form-control form-control-lg" id="date" required />
                                                <div className="invalid-feedback">Enter a date!</div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Contraseña</label>
                                                <input type="password" className="form-control form-control-lg" id="time"required/>
                                                <div className="invalid-feedback">Enter a time!</div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Email</label>
                                                <input type="email" className="form-control form-control-lg" id="time" required />
                                                <div className="invalid-feedback">Enter a time!</div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Phone</label>
                                                <input type="text" id="phone" className="form-control form-control-lg" data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}" placeholder="+1 ___ ___ __" />
                                                <div className="invalid-feedback">Enter a time!</div>
                                            </div>
                                            <div className="col-12 pt-2 pt-sm-3">
                                                <button type="submit" className="btn btn-dark w-100 w-sm-auto">Guardar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
