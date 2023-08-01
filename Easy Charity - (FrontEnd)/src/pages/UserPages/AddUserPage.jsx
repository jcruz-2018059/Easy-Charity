import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

export const AddUserPage = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
        Authorization: `${token}`
        }
    }
    const navigate = useNavigate();
    const addUser = async () => {
        try {
          let user = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthdate: new Date(document.getElementById('birthdate').value).toISOString(),
          }
          await axios.post('http://localhost:2651/user/registerAdmin', user, config);
          Swal.fire({
            title: '¡Usuario Agregado!',
            icon: 'success',
            timer: 4000
          })
          navigate('../');
        } catch (err) {
          console.log(err)
          Swal.fire({
            title: err.response.data.message || `Error añadiendo usuario :(`,
            icon: 'error',
            timer: 4000
          })
        }
      }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 20 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <h1 className=" card-title ">Agregar Usuario</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                    <div className="card-body">
                                        <form className="row g-4 needs-validation" noValidate>
                                            <div className="col-sm-6">
                                                <label htmlFor="fn" className="form-label fs-base">Nombre</label>
                                                <input type="text" className="form-control form-control-lg" id="name" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="email" className="form-label fs-base">Apellido</label>
                                                <input type="email" className="form-control form-control-lg" id="surname" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="" className="form-label fs-base">Username</label>
                                                <input type="text" className="form-control form-control-lg" id="username" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Teléfono</label>
                                                <input type="number" id="phone" className="form-control form-control-lg" data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}"/>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="time" className="form-label fs-base">Email</label>
                                                <input type="email" className="form-control form-control-lg" id="email" required />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="time" className="form-label fs-base">Fecha de nacimiento</label>
                                                <input type="date" className="form-control form-control-lg" id="birthdate" required />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="time" className="form-label fs-base">Contraseña</label>
                                                <input type="password" className="form-control form-control-lg" id="password"required/>
                                            </div>
                                            <div className="col-sm-6 pt-2 pt-sm-3">
                                                <Link to='/start/users'>
                                                    <button onClick={(e)=>{addUser(), e.preventDefault()}} type="submit" className="btn btn-dark w-100 w-sm-auto">Guardar</button>
                                                </Link>
                                            </div>
                                            <div className="col-sm-6 pt-2 pt-sm-3">
                                                <Link to='/start/users'>
                                                    <button type="submit" className="btn btn-danger w-100 w-sm-auto">Cancelar</button>
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
