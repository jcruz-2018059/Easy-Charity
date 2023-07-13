import React from 'react'
import { OrganizationCard } from '../../components/Cards/OrganizationCard'
import { ProyectCard } from '../../components/Cards/ProyectCard'

export const ViewProyectPage = () => {
  return (
    <>
      <div className='container' style={{ marginTop: '6rem' }}>
        <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/Proyects.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
          <div className="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0">
            <div className="flex-grow-1 mt-2 me-9 me-md-0 p-5 Titletext">
              <div>
                <h1 className='d-flex align-items-center justify-content-center'>Ver proyectos</h1>
                <p className='d-flex align-items-center justify-content-center'>Explora los proyectos de caridad</p>
              </div>
            </div>
          </div>
        </div>
        <h4 className='text-font'>Proyectos</h4>
        <hr />
        <div>
        </div>
        <ProyectCard></ProyectCard>
      </div>
    </>
  )
}
