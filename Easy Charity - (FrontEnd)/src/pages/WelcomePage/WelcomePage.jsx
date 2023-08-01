import React from 'react'
import { Link } from 'react-router-dom'
import { OrganizationCard } from '../../components/Cards/OrganizationCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const WelcomePage = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [user, setUser] = useState({});
    const config = {
        headers: {
            Authorization: `${token}`
        }
    };

    const getUser = async () => {
        try {
            const { data } = await axios.get('http://localhost:2651/user/account', config);
            if (data) {
                setUser(data.user);
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting User');
        }
    };

    useEffect(() => { getUser(); }, []);

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
                                ¡Hola {user.name}!😃
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
                    {
                        role === 'ADMIN' || role === 'ORGANIZATION ADMIN' ? (
                            <h4 className='text-font'>Comienza a Administrar</h4>
                        ) : null
                    }
                    {
                        role == 'CLIENT' ? (
                            <h4 className='text-font'>Explora</h4>
                        ) : <></>
                    }
                    <hr />
                    {
                        role === 'ADMIN' ?(
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/1.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Añade nuevos usuarios, edita sus parámetros si lo consideras necesario y elimina a los que también consideres necesario.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='users' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Usuarios</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/2.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Ve y añade nuevas organizaciones al sistema, entérate de los proyectos que tiene cada una y editalas si lo consideras necesario.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='organization' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Organizaciones</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/3.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Entérate de los proyectos disponibles de cada organización caritativa y postúlate a ser voluntario en uno de ellos.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='proyects' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Proyectos</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        role === 'CLIENT'? (
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/Donaciones.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Sigue el registro de tus donaciones, revisa tu historial y cumple tus metas de ayudar a los demás. Comienza ya, no esperes más.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='donations' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Donaciones</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/2.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Ve y añade nuevas organizaciones al sistema, entérate de los proyectos que tiene cada una y editalas si lo consideras necesario.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='organization' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Organizaciones</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/3.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Entérate de los proyectos disponibles de cada organización caritativa y postúlate a ser voluntario en uno de ellos.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='proyects' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Proyectos</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ) : null
                    }
                    {
                        role === 'ORGANIZATION ADMIN' ?(
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/miorganización.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Administra nuevos proyectos, ajusta sus criterios si es apropiado y descarta a aquellos que también lo requieran.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='organization/detail' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Mi organización</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/2.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Ve y añade nuevas organizaciones al sistema, entérate de los proyectos que tiene cada una y editalas si lo consideras necesario.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='organization' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Organizaciones</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" src="/src/assets/3.svg" alt="Imagen" width="100%" height="225" />
                                        <div className="card-body">
                                            <p className="card-text">Entérate de los proyectos disponibles de cada organización caritativa y postúlate a ser voluntario en uno de ellos.</p>
                                            <div className="d-grid gap-2">
                                                <Link to='proyects' className='btn btn-primary'>
                                                    <button className='btn btn-primary'>Proyectos</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ) : null
                    }
                </div>
            </div>
        </>

    )
}
