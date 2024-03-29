import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Index'


export const Nabvar = () => {
    const { loggedIn } = useContext(AuthContext)
    const role = localStorage.getItem('role')

    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top " style={{ backgroundColor: "#B82727", paddingBottom: "1rem", paddingTop: "1rem" }}>
            <div className="container px-5">
                <img src="\src\assets\logo.png" alt="" style={{ width: "100px" }} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <li className="nav-item ">
                            <Link to='/' className="nav-link me-lg-3 active" aria-current="page">Inicio</Link>
                        </li>
                        {
                            loggedIn === false ? (
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link px-4 rounded-0 border border-light">Iniciar Sesión</Link>
                                </li>
                            ) : null
                        }
                        {
                            loggedIn === true ? (
                                <li className="nav-item">
                                    <Link onClick={() => logOut()} to='/login' className="nav-link px-4 rounded-0 border border-light">Cerrar Sesión</Link>
                                </li>
                            ) : null
                        }

                    </ul>
                </div>
            </div>
        </nav>


    )
}