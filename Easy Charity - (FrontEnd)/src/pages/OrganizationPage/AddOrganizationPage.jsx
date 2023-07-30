import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react'

export const AddOrganizationPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
        Authorization: `${token}`
        }
    }
    const [clients, setClients] = useState([{}]);
    const getClients = async ()=>{
        try {
            const { data } = await axios(`http://localhost:2651/user/getUsers`, config);
            if(data){
                setClients(data.users);
            }
        } catch (err) {
            console.error(err);
            throw new Error('Error obteniendo los clientes.');
        }
    }

    const addOrganization = async () => {
        try {
          let organization = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            location: document.getElementById('location').value,
            user: document.getElementById('user').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
          }
          const { data } = await axios.post('http://localhost:2651/co/addCo', organization, config);
          Swal.fire({
            title: data.message || '¡Organización Agregada!',
            icon: 'success',
            timer: 4000
          })
          navigate('../');
        } catch (err) {
          console.log(err)
          Swal.fire({
            title: err.response.data.message || `Error añadiendo organización :(`,
            icon: 'error',
            timer: 4000
          })
        }
    }

    useEffect(()=>getClients, [])
  return (
    <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 20 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <h1 className=" card-title ">Agregar Organización</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                    <div className="card-body">
                                        <form className="row g-4 needs-validation" noValidate>
                                            <div className="col-sm-6">
                                                <label htmlFor="fn" className="form-label fs-base">Nombre</label>
                                                <input type="text" className="form-control form-control-lg" id="name" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="email" className="form-label fs-base">Ubicación</label>
                                                <input type="text" className="form-control form-control-lg" id="location" required />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Teléfono</label>
                                                <input type="number" id="phone" className="form-control form-control-lg" data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="fn" className="form-label fs-base">Administrador</label>
                                                <select className="form-select form-select-lg" id="user" required >
                                                    {
                                                        clients.length === 0 ? (
                                                            <option value="">No hay clientes disponibles.</option>
                                                        ) : (
                                                            clients.map(({name, surname, _id}, i)=>{
                                                                return(
                                                                    <option key={i} value={_id}>{name + ' ' + surname}</option>
                                                                )
                                                            })
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="time" className="form-label fs-base">Email de la organización</label>
                                                <input type="email" className="form-control form-control-lg" id="email" required />

                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="fn" className="form-label fs-base">Descripción</label>
                                                <textarea type="text" className="form-control " id="description" required />
                                            </div>
                                            <div className="col-sm-6 pt-2 pt-sm-3">
                                                <button onClick={(e)=>{addOrganization(), e.preventDefault()}} type="submit" className="btn btn-dark w-100 w-sm-auto">Guardar</button>
                                            </div>
                                            <div className="col-sm-6 pt-2 pt-sm-3">
                                                <Link to='/start/organization'>
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
