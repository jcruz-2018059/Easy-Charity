import React from 'react'

export const WelcomePage = () => {
    return (

        <>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
            </style>
            <div className='container' style={{ marginTop: '6rem' }}>
                <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/welcome.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
                    <div className="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0">
                        <div className="flex-grow-1 mt-2 me-9 me-md-0 p-5">
                            <div className="position-relative text-gray-800 fs-1 z-index-2 fw-bold mb-1 Titletext">
                                ¡Hola Javier!😃
                            </div>
                            <span className="text-gray-600 fs-6 mb-6 d-block Titletext">
                                Bienvenido a Easy Charity
                                <br />
                            </span>
                            <div className='text-white'>
                                <span>
                                    ¡Gracias por unirte a nuestra comunidad de
                                    <br />
                                    caridad y voluntariado! Comieza ya
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className='text-font'>Comienza a Administrar</h4>
                    <hr />
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            <div className="card shadow-sm">
                                <img className="bd-placeholder-img card-img-top" src="/src/assets/1.svg" alt="Imagen" width="100%" height="225" />
                                <div className="card-body">
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <div className="d-grid gap-2">
                                            <button className='btn btn-primary'>Gestionar Usuarios</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <img className="bd-placeholder-img card-img-top" src="/src/assets/2.svg" alt="Imagen" width="100%" height="225" />
                                <div className="card-body">
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <div className="d-grid gap-2">
                                            <button className='btn btn-primary'>Gestionar Organizaciones</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <img className="bd-placeholder-img card-img-top" src="/src/assets/3.svg" alt="Imagen" width="100%" height="225" />
                                <div className="card-body">
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <div className="d-grid gap-2">
                                            <button className='btn btn-primary'>Ver Proyectos</button>
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
