import React from "react"

export const Donate =()=>{
    return(
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 20 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <h1 className=" card-title ">Donar</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                    <div className="card-body">
                                        <form className="row g-4 needs-validation" noValidate>
                                            <div className="col-sm-6">
                                                <label htmlFor="" className="form-label fs-base">Nombre</label>
                                                <input placeholder="Nombre" type="text" className="form-control form-control-lg" id="date" required />
                                                
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Apellido</label>
                                                <input placeholder="Apellido" type="password" className="form-control form-control-lg" id="time"required/>
                                                
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="fn" className="form-label fs-base">Monto</label>
                                                <input placeholder="Monto" type="text" className="form-control form-control-lg" id="fn" required />
                                                
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="email" className="form-label fs-base">No. Targeta</label>
                                                <input placeholder="No. Targeta" type="email" className="form-control form-control-lg" id="email" required />
                                                
                                            </div>
                                            <div className="col-12 pt-2 pt-sm-3">
                                                <button type="submit" className="btn btn-danger w-100 w-sm-auto">Guardar</button>
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