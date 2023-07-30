import React from 'react'

export const AddProyectPage = () => {
  return (
    <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 20 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <h1 className=" card-title text-danger">Agregar Proyecto</h1>
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
                                                <label htmlFor="email" className="form-label fs-base">Description</label>
                                                <input type="text" className="form-control form-control-lg" id="desc" required />
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label htmlFor="" className="form-label fs-base">Start Date</label>
                                                    <input type="date" className="form-control form-control-lg" id="date" required />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="time" className="form-label fs-base">End Date</label>
                                                    <input type="date" className="form-control form-control-lg" id="dateE"required/>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Presupuesto</label>
                                                <input type="number" className="form-control form-control-lg" id="num" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Recaudación</label>
                                                <input type="number" id="rec" className="form-control form-control-lg"/>
                                            </div>
                                                <div className="col-12">
                                                    <label htmlFor="" className="form-label fs-base">ID-Organización</label>
                                                    <input type="text" className="form-control form-control-lg" id="oz" required />
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="time" className="form-label fs-base">ID-Tipo</label>
                                                    <input type="text" className="form-control form-control-lg" id="tp"required/>
                                                </div>
                                            <div className="col-12 pt-2 pt-sm-3">
                                                <Link>
                                                    <button type="submit" className="btn btn-danger w-100 w-sm-auto">Guardar</button>
                                                </Link>
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
