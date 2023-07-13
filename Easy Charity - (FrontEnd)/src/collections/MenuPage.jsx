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
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#Inicio"></use></svg>
                                    <span className="nav-link-text">Inicio</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='users' className={`nav-link link-body-emphasis ${activeItem === 'Usuarios' ? 'active' : ''}`} onClick={() => handleClick('Usuarios')}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                                    <span className="nav-link-text">Usuarios</span>
                                </Link>
                            </li>
                            <li>
                                <a href="#" className={`nav-link link-body-emphasis ${activeItem === 'orders' ? 'active' : ''}`} onClick={() => handleClick('orders')}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
                                    <span className="nav-link-text">Orders</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className={`nav-link link-body-emphasis ${activeItem === 'products' ? 'active' : ''}`} onClick={() => handleClick('products')}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
                                    <span className="nav-link-text">Products</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className={`nav-link link-body-emphasis ${activeItem === 'customers' ? 'active' : ''}`} onClick={() => handleClick('customers')}>
                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                                    <span className="nav-link-text">Customers</span>
                                </a>
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
