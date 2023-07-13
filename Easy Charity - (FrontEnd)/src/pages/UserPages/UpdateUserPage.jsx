import React from 'react'
import { Link } from 'react-router-dom'

export const UpdateUserPage = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 20 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <h1 className=" card-title ">Editar Usuario</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                    <div className="card-body">
                                        <form className="row g-4 needs-validation" noValidate>
                                            <div className="col-12">
                                                <label htmlFor="fn" className="form-label fs-base">Nombre</label>
                                                <input type="text" className="form-control form-control-lg" id="name" required />
                                                <div className="invalid-feedback">Please enter your full name!</div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="email" className="form-label fs-base">Apellido</label>
                                                <input type="text" className="form-control form-control-lg" id="surname" required />
                                                <div className="invalid-feedback">Please provide a valid email address!</div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Email</label>
                                                <input type="email" className="form-control form-control-lg" id="email" required />
                                                <div className="invalid-feedback">Enter a time!</div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Phone</label>
                                                <input type="text" id="phone" className="form-control form-control-lg" data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}" placeholder="+1 ___ ___ __" />
                                                <div className="invalid-feedback">Enter a time!</div>
                                            </div>
                                            <div className="col-12 pt-2 pt-sm-3">
                                                <button type="submit" className="btn btn-dark w-100 w-sm-auto mb-3">Editar</button>
                                                <Link to='/start/users' type="submit" className="btn btn-danger w-100 w-sm-auto">Cancelar</Link>
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
