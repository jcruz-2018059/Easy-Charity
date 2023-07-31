import React from 'react'
import { VolunteringCard } from '../../components/Cards/VolunteringCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'


export const ViewVolunteringPage = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }
  const [volunter, setVolunter] = useState([{}])
  const getVolunter = async () => {
    try {
      const { data } = await axios('http://localhost:2651/volunteering/getByLoggedUser', config);
      if (data) {
        setVolunter(data.volunteering);
        console.log(data.volunteering)
      }
    } catch (err) {
      console.log(err);
      throw new Error('Error getting Users');
    }
  }

  const cancelVolunter = async (id) => {
    try {
      Swal.fire({
        title: `¿Estás seguro de cancelar?.`,
        icon: 'warning',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Sí, cancelar`,
      }).then(async (result) => {
        if (result.isDenied) {
          const { data } = await axios.put(`http://localhost:2651/volunteering/cancelVol/${id}`, null, config);
          Swal.fire({
            title: data.message || 'Voluntariado cancelado.',
            icon: 'info',
            timer: 4000
          })
          getVolunter()
        }
      })
    } catch (err) {
      console.log(err);
      throw new Error('Error cancelando voluntariado');
    }
  }

  useEffect(() => getVolunter, []);
  return (
    <>
      <div className='container' style={{ marginTop: '6rem' }}>
        <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/welcome.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
          <div className="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0">
            <div className="flex-grow-1 mt-2 me-9 me-md-0 p-5 Titletext">
              <div>
                <h1 className='d-flex align-items-center justify-content-center'>Ver Voluntariados</h1>
                <p className='d-flex align-items-center justify-content-center'>Explora los proyectos de caridad</p>
              </div>
            </div>
          </div>
        </div>
        <h4 className='text-font'>Tus voluntariados</h4>
        <hr />
        <div>

          {
            volunter.length === 0 ? (
              <>
                <div className='container justify-content-center align-items-center' style={{ borderColor: 'red', height: 300, display: 'flex' }}>
                  <p className='fw-bold' style={{ color: '#a6a6a6' }} >Aún no hay voluntariados disponibles.</p>
                </div>
              </>
            ) :
              volunter.map(({ _id, user: { name: name, surname: surname } = {}, dpi, age, description, proyect: { name: nameproyect, startDate: startDate, endDate: endDate } = {}, state }, index) => {
                return (
                  <VolunteringCard key={index}
                    id={_id}
                    name={name}
                    surname={surname}
                    dpi={dpi}
                    description={description}
                    proyect={nameproyect}
                    startDate={startDate}
                    endDate={endDate}
                    state={state}
                    age={age}
                    cancelVolunter={() => cancelVolunter(_id)}
                  ></VolunteringCard>
                )
              })
          }
        </div>
      </div>
    </>
  )
}
