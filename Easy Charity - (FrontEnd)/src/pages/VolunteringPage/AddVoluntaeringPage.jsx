import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const AddVoluntaeringPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const navigate = useNavigate();

    const addVolunter = async () => {
        try {
            let volunter = {
                dpi: document.getElementById('dpi').value,
                age: document.getElementById('age').value,
                skills: document.getElementById('skills').value,
                description: document.getElementById('description').value,
                proyect: id
            }
            await axios.post('http://localhost:2651/volunteering/add', volunter, config);
            Swal.fire({
                title: '¡Voluntariado Agregado!',
                icon: 'success',
                timer: 4000
            })
            navigate('../');
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: err.response.data.message || `Error añadiendo Voluntariado :(`,
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
                  <h1 className=" card-title text-danger">Voluntariado</h1>
                </div>
                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                  <div className="card-body">
                    <form className="row g-4 needs-validation" noValidate>
                      <div className="row">
                        <div className="col-sm-6">
                          <label htmlFor="" className="form-label fs-base">DPI</label>
                          <input type="text" className="form-control form-control-lg" id="dpi" required />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="time" className="form-label fs-base">Age</label>
                          <input type="text" className="form-control form-control-lg" id="age" required />
                        </div>
                      </div>
                      <div className="col-12 pb-3">
                        <label htmlFor="" className="form-label fs-base">Habilidades</label>
                        <textarea type="text" className="form-control form-control-lg" id="skills" required placeholder='Describe tus habilidades' />
                      </div>
                      <div className="col-12 pb-3">
                        <label htmlFor="" className="form-label fs-base">Descripción</label>
                        <textarea type="text" className="form-control form-control-lg" id="description" required placeholder='Por que quieres formar parte de la iniciativa' />
                      </div>
                      <div className="col-12 pt-2 pt-sm-3">
                        <Link>
                          <button onClick={(e)=>{addVolunter(), e.preventDefault()}} type="submit" className="btn btn-danger w-100 w-sm-auto">Guardar</button>
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
