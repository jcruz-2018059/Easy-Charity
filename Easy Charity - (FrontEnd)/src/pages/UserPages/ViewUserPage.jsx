import { Link } from 'react-router-dom'
import { Users } from '../../collections/Users'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const ViewUserPage = () => {
    const token = localStorage.getItem('token');
    const [user, setUsers] = useState([{}])
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }
    const getUsers = async () => {
        try {
            const { data } = await axios('http://localhost:2651/user/get', config);
            if (data)
                setUsers(data.users);
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Users');
        }
    }

    const deleteUser = async ({id, name, surname}) => {
        try {
          Swal.fire({
            title: `¿Estás seguro de eliminar a ${name + ' ' + surname}?`,
            icon: 'warning',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Sí, eliminar`,
          }).then(async (result) => {
            if (result.isDenied) {
              const { data } = await axios.delete(`http://localhost:2651/user/delete/${id}`, config);
              Swal.fire({
                title: data.message || 'Usuario eliminado.',
                icon: 'info',
                timer: 4000
              })
              getUsers()
            }
          })
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: err.response.data.message || `Error eliminando al usuario :(`,
            icon: 'error',
            timer: 4000
          })
        }
      }

    useEffect(() => getUsers, []);
    return (
        <>
            <div className='container' style={{ marginTop: '6rem' }}>
                <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/users.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
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
                    <div className='mb-4 d-flex justify-content-between'>
                        <h4 className='text-font'>Usuarios</h4>
                        <Link to='add'>
                            <button className='btn btn-primary text-light'>Agregar Usuario</button>
                        </Link>
                    </div>
                    <hr />
                    <table className="table">
                        <thead style={{ backgroundColor: '#00043a'}}>
                            <tr>
                                <th className="text-light" scope="col">Nombre</th>
                                <th className="text-light" scope="col">Apellido</th>
                                <th className="text-light" scope="col">Nombre Usuario</th>
                                <th className="text-light" scope="col">Correo</th>
                                <th className="text-light" scope="col">No. Teléfono</th>
                                <th className="text-light" scope="col">Rol</th>
                                <th className="text-light" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map(({name, surname, username, email, phone, role, _id}, index) =>{
                                    const id = _id;
                                    return(
                                        <tr className="text-dark" key={index}>
                                            <Users
                                                name={name}
                                                surname={surname}
                                                username={username}
                                                email={email}
                                                phone={phone}
                                                role={role}
                                            ></Users>
                                            {
                                                role !=  'ADMIN' ? (
                                                    <Link onClick={() => deleteUser({id, name, surname})}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                        </svg>

                                                    </Link>
                                                ) : <></>
                                            }
                                            {
                                                role !=  'ADMIN' ? (
                                                    <Link to={`update/${_id}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                                        </svg>
                                                    </Link>
                                                ) : <></>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
