import React from 'react'
import { Volunter } from '../../collections/Volunter'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const VolunterByProyect = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const [volunter, setVolunter] = useState([{}])
    const [proyect, setProyect] = useState({})

    const getVolunter = async () => {
        try {
            const { data } = await axios(`http://localhost:2651/volunteering/getVoluntersByProyect/${id}`, config);
            if (data) {
                setVolunter(data.volunteering);
                setProyect(data.proyect)
                console.log(data)
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting volunter');
        }
    }

    useEffect(() => getVolunter, []);
    return (

        <>
            <div className='container' style={{ marginTop: '6rem' }}>
                <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/Volunter.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
                    <div className="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0">
                        <div className="flex-grow-1 mt-2 me-9 me-md-0 p-5 Titletext">
                            <div>
                                <h1 className='d-flex align-items-center justify-content-center'>Voluntarios de {proyect.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <div className="container" >
                    {
                                volunter.length === 0 ? (
                                    <>
                                        <div className='container justify-content-center align-items-center' style={{ borderColor: 'red', height: 300, display: 'flex' }}>
                                            <p className='fw-bold' style={{ color: '#a6a6a6' }} >Aún no hay voluntarios en este proyecto.</p>
                                        </div>
                                    </>
                                ) : (
                        <table className="table">
                            <thead style={{ backgroundColor: '#B82727' }}>
                                <tr>
                                    <th scope="col" style={{ color: 'white' }}>Usuarios</th>
                                    <th style={{ color: 'white' }} scope="col">DPI</th>
                                    <th scope="col" style={{ color: 'white' }}>Correo</th>
                                    <th scope="col" style={{ color: 'white' }}>Teléfono</th>
                                    <th scope="col" style={{ color: 'white' }}>Edad</th>
                                    <th scope="col" style={{ color: 'white' }}>Descripción</th>
                                    <th style={{ color: 'white' }} scope="col">Habilidades</th>
                                    <th style={{ color: 'white' }} scope="col">Estado</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    
                                        volunter.map(({ _id, user: { name: name, surname: surname, email: email, phone: phone } = {}, description, dpi, skills, age, state }, index) => {
                                            const id = _id;
                                            return (
                                                <tr className="text-dark" key={index}>
                                                    <Volunter
                                                        id={id}
                                                        name={name}
                                                        surname={surname}
                                                        description={description}
                                                        dpi={dpi}
                                                        skills={skills}
                                                        age={age}
                                                        state={state}
                                                        email={email}
                                                        phone={phone}
                                                    ></Volunter>
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                        )}
                    </div>
                </>
            </div>
        </>
    )
}
