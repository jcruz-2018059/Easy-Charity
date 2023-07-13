import React from 'react'
import { Link } from 'react-router-dom'
import { Nabvar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export const MenuPage = () => {

    const [activeItem, setActiveItem] = useState('Inicio');

    const handleClick = (item) => {
        setActiveItem(item);
    };
    return (

        <>
            <div className='vh-100'>
                <div className='d-flex'>
                    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '280px', height: '100vh' }}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                            <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                            <span className="fs-4">Sidebar</span>
                        </a>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <Link to='' className={`nav-link ${activeItem === 'Inicio' ? 'active' : ''}`} onClick={() => handleClick('Inicio')} style={{ backgroundColor: activeItem === 'Inicio' ? '#B82727' : 'inherit' }}>
                                    <i className={`bi bi-house custom-icon me-3 ${activeItem === 'Inicio' ? 'active-icon' : ''}`} width="16" height="16"><use xlinkHref="#Inicio"></use></i>
                                    <span className="nav-link-text">Inicio</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='users' className={`nav-link link-body-emphasis ${activeItem === 'Usuarios' ? 'active' : ''}`} onClick={() => handleClick('Usuarios')} style={{ backgroundColor: activeItem === 'Usuarios' ? '#B82727' : 'inherit' }}>
                                    <i className={`bi bi-people-fill custom-icon me-3 ${activeItem === 'Usuarios' ? 'active-icon' : ''}`} width="16" height="16"><use xlinkHref="#speedometer2"></use></i>
                                    <span className="nav-link-text">Usuarios</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='organization' className={`nav-link link-body-emphasis ${activeItem === 'Organizaciones' ? 'active' : ''}`} onClick={() => handleClick('Organizaciones')} style={{ backgroundColor: activeItem === 'Organizaciones' ? '#B82727' : 'inherit' }}>
                                    <i className={`bi bi-house-heart-fill custom-icon me-3 ${activeItem === 'Organizaciones' ? 'active-icon' : ''}`} width="16" height="16"><use xlinkHref="#table"></use></i>
                                    <span className="nav-link-text">Organizaciones</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='proyects' className={`nav-link link-body-emphasis ${activeItem === 'Proyectos' ? 'active' : ''}`} onClick={() => handleClick('Proyectos')} style={{ backgroundColor: activeItem === 'Proyectos' ? '#B82727' : 'inherit' }}>
                                    <i className={`bi bi-box2-heart-fill custom-icon me-3 ${activeItem === 'Proyectos' ? 'active-icon' : ''}`} width="16" height="16"><use xlinkHref="#grid"></use></i>
                                    <span className="nav-link-text">Proyectos</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='account' className={`nav-link link-body-emphasis ${activeItem === 'Cuenta' ? 'active' : ''}`} onClick={() => handleClick('Cuenta')} style={{ backgroundColor: activeItem === 'Cuenta' ? '#B82727' : 'inherit' }}>
                                    <i className={`bi bi-person-circle custom-icon me-3 ${activeItem === 'Cuenta' ? 'active-icon' : ''}`} width="16" height="16"><use xlinkHref="#people-circle"></use></i>
                                    <span className="nav-link-text">Mi cuenta</span>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>
                    <div className='w-100' style={{ backgroundColor: '#F2F2F2 ' }}>
                        <Outlet></Outlet>
                    </div>
                </div>

                <style>
                    {`
          .nav-link .nav-link-text {
            color: gray;
          }

          .nav-link.active .nav-link-text {
            color: white;
          }
        `}
                </style>
            </div>
        </>
    )
}
