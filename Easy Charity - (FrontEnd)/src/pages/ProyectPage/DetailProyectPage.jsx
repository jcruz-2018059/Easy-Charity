import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ProyectCard } from '../../components/Cards/ProyectCard'

export const DetailProyectPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [organization, setOrganization] = useState({});
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getProject = async () => {
        try {
            const { data } = await axios(`http://localhost:2651/project/getById/${id}`, config);
            if (data) {
                console.log(data)
                setProject(data.project);
                setOrganization(data.organization)
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting proyect.');
        }
    }

    useEffect(() => getProject, []);
    return (
        <>
            <div className="container" style={{ paddingTop: '6rem' }}>


                <div className="p-5 mb-4 rounded-3" style={{ background: `url(/src/assets/proyects.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
                    <div className="container-fluid py-5">
                        <h1 className="text-white fw-bold text-font">{project.name}</h1>
                        <p className="text-white col-md-8 fs-5">{project.description}</p>
                        <Link className="btn btn-primary shadow-primary btn-lg"> <i className='bi bi-person-heart'> <span style={{ fontStyle: 'normal' }}>Voluntariado</span></i></Link>
                    </div>
                </div>

                <div className="row align-items-md-stretch">
                    <div className="col-md-6" >
                        <div class="h-100 card text-white " style={{ backgroundColor: '#B82727' }}>
                            <div class="card-header">Recaudación</div>
                            <div class="card-body p-5 text-center">
                                <h1 class="card-title text-white text-font" style={{ fontSize: '5rem' }}>Q {project.takings}.00</h1>
                                <p class="card-text fs-sm">Gracias por tu apoyo.</p>
                                <Link className="btn btn-danger shadow-primary btn-lg"> <i className='bi bi-box2-heart-fill'> <span style={{ fontStyle: 'normal' }}> Donar </span></i></Link>
                            </div>
                            <div className='card-footer'>
                                <span>{organization.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                            <h2>Información</h2>
                            <div className=" rounded-3 p-4" >
                                <ul class="list-unstyled pb-3 mb-0 mb-lg-3">
                                    <p className='fw-bold'>Presupuesto</p>
                                    <li class="d-flex mb-3">
                                        <i class="bi bi-currency-dollar text-muted fs-xl  me-2"></i>
                                        Q {project.budget}.00
                                    </li>
                                    <li class="d-flex mb-3">
                                        <i class="bi bi-telephone text-muted fs-xl  me-2"></i>
                                        +502 {organization.phone}
                                    </li>
                                    <li class="d-flex mb-3">
                                        <i class="bi bi-envelope text-muted fs-xl  me-2"></i>
                                        {organization.email}
                                    </li>
                                    <li class="d-flex mb-3">
                                        <i class="bx bx-time text-muted fs-xl mt-1 me-2"></i>
                                        <div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="pt-3 mt-4 text-body-secondary border-top">
                    © 2023
                </footer>
            </div>
        </>
    )
}
