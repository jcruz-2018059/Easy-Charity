import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const AddProyectPage = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }
    const navigate = useNavigate();

    const addProject = async () => {
        try {
            let project = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                startDate: new Date(document.getElementById('startDate').value).toISOString(),
                endDate: new Date(document.getElementById('endDate').value).toISOString(),
                budget: document.getElementById('budget').value,
                type: document.getElementById('type').value,
                organization: 'hola'
            }
            await axios.post('http://localhost:2651/project/add', project, config);
            Swal.fire({
                title: '¡Proyecto Agregado!',
                icon: 'success',
                timer: 4000
            })
            navigate('../');
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: err.response.data.message || `Error añadiendo proyecto :(`,
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
                                    <h1 className=" card-title text-danger">Agregar Proyecto</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                    <div className="card-body">
                                        <form className="row g-4 needs-validation" noValidate>
                                            <div className="col-12">
                                                <label htmlFor="fn" className="form-label fs-base">Nombre</label>
                                                <input type="text" className="form-control form-control-lg" id="name" required />
                                                <div className="invalid-feedback">Please enter your full name!</div>
                                            </div>
                                            <div className="col-12 pb-3">
                                                <label htmlFor="email" className="form-label fs-base">Description</label>
                                                <textarea type="text" className="form-control form-control-lg" id="description" required placeholder='Describe tu proyecto' />
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label htmlFor="" className="form-label fs-base">Start Date</label>
                                                    <input type="date" className="form-control form-control-lg" id="startDate" required />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="time" className="form-label fs-base">End Date</label>
                                                    <input type="date" className="form-control form-control-lg" id="endDate" required />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Presupuesto</label>
                                                <input type="number" className="form-control form-control-lg" id="budget" required placeholder='Q 0.00' />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Tipo</label>
                                                <select className="form-select form-select-lg" id="type" required>
                                                    <option value="caridad">Elegir</option>
                                                    <option value="caridad">Caridad</option>
                                                    <option value="recaudación">Recaudación</option>
                                                    <option value="voluntariado">Voluntariado</option>
                                                </select>
                                            </div>
                                            <div className="col-12 pt-2 pt-sm-3">
                                                <Link>
                                                    <button onClick={(e)=>{addProject(), e.preventDefault()}} type="submit" className="btn btn-danger w-100 w-sm-auto">Guardar</button>
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
