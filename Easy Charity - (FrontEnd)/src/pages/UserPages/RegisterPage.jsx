import React from 'react'
import { Link } from "react-router-dom";
import './Register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


export const RegisterPage = () => {
    const navigate = useNavigate()
    const register = async() =>{
        try{
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                birthdate: new Date(document.getElementById('birthdate').value).toISOString(),
            }
            const { data } = await axios.post('http://localhost:2651/user/register', user)
            Swal.fire({
                title: data.message || 'Login successfully',
                icon: 'success',
                timer: 4000
              })
            navigate('/login')
        }catch(err){
            Swal.fire({
                title: err.response.data.message || 'Error Sign Up',
                icon: 'error',
                timer: 4000
              })
            console.error(err)
        }
    }
    return (
        <>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
            </style>
            <section className="h-100 gradient-form pt-5">
                <div className="container-fluid py-5 h-100 rounded-0 d-flex justify-content-center align-items-center">
                    <div className="col-xl-3">
                        <div className="card rounded-3 text-black">
                            <div className="card-body p-md-5 mx-md-4">
                                <div className="text-center">
                                    <h4 className="mt-1 mb-5 pb-1 pt-5" id='iniciar'>Registrate</h4>
                                </div>

                                <form>
                                    <p>Agregue sus datos</p>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example11">Nombre</label>
                                        <input type="text" id="name" className="form-control" placeholder="Nombre" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example22">Apellido</label>
                                        <input placeholder="Apellido" type="text" id="surname" className="form-control" />
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">Nombre de Usuario</label>
                                                <input placeholder="Usuario" type="text" id="username" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">Contraseña</label>
                                                <input placeholder="Contraseña" type="password" id="password" className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example22">Correo Electronico</label>
                                        <input placeholder="Correo" type="email" id="email" className="form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example22">Teléfono</label>
                                        <input placeholder="Correo" type="email" id="phone" className="form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2Example22">Fecha de Nacimiento</label>
                                        <input placeholder="Correo" type="date" id="birthdate" className="form-control" />
                                    </div>

                                    <div className="text-center pt-1 mb-5 row">
                                        <button onClick={()=>  register()} className="btn btn-danger col rounded-0" type="button">Registrarse</button>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">¿Ya tienes una cuenta?</p>
                                        <Link to='/login'>
                                            <button  type="button" className="btn btn-outline-danger rounded-0">Iniciar Sesión</button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
