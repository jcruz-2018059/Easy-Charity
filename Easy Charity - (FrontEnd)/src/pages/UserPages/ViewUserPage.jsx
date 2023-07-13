import React from 'react'
import { Link } from 'react-router-dom'

export const ViewUserPage = () => {
    return (
        <>
            <div className='container' style={{ marginTop: '6rem' }}>
                <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/welcome.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
                    <div className="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0">
                        <div className="flex-grow-1 mt-2 me-9 me-md-0 p-5 Titletext">
                            <div>
                                <h1 className='d-flex align-items-center justify-content-center'>Gestionar Usuarios</h1>
                                <p className='d-flex align-items-center justify-content-center'>Administra los usuarios del sistema</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className='mb-3 d-flex justify-content-between'>
                        <Link to='addAdmin'>
                            <button className='btn btn-primary text-light'>Agregar Administrador</button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead className="text-light" style={{ backgroundColor: '#00043a' }}>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Nombre Usuario</th>
                                <th scope="col">Correo</th>
                                <th scope="col">No. Teléfono</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
