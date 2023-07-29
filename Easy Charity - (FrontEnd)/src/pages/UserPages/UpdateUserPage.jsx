import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export const UpdateUserPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
        Authorization: `${token}`
        }
    }
    const [user, setUser] = useState({});
    const getUser = async()=>{
        try {
            const { data } = await axios(`http://localhost:2651/user/get/${id}`, config);
            if(data){
                setUser(data.user);
            }
        } catch (err) {
            console.error(err);
            throw new Error('Error getting user.')
        }
    }

    const updateUser = async()=>{
        try {
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                username: document.getElementById('username').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value
            }
            const { data } = await axios.put(`http://localhost:2651/user/update/${id}`,user ,config);
            Swal.fire({
                title: data.message || '¡Usuario actualizado!',
                icon: 'success',
                timer: 4000
            });
            navigate('../');
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: err.response.data.message || `Error actualizando usuario :(`,
                icon: 'error',
                timer: 4000
            });
        }
    }
    
    useEffect(() => getUser, []);
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
                                            <div className="col-sm-6">
                                                <label htmlFor="fn" className="form-label fs-base">Nombre</label>
                                                <input defaultValue={user.name} type="text" className="form-control form-control-lg" id="name" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="email" className="form-label fs-base">Apellido</label>
                                                <input defaultValue={user.surname} type="text" className="form-control form-control-lg" id="surname" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="" className="form-label fs-base">Username</label>
                                                <input defaultValue={user.username} type="text" className="form-control form-control-lg" id="username" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Teléfono</label>
                                                <input defaultValue={user.phone} type="number" id="phone" className="form-control form-control-lg" data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}"/>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="time" className="form-label fs-base">Email</label>
                                                <input defaultValue={user.email} type="email" className="form-control form-control-lg" id="email" required />
                                            </div>
                                            <div className="col-sm-6 pt-2 pt-sm-3">
                                                <Link to='/start/users'>
                                                    <button onClick={(e)=>{updateUser(), e.preventDefault()}} type="submit" className="btn btn-dark w-100 w-sm-auto">Actualizar</button>
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
