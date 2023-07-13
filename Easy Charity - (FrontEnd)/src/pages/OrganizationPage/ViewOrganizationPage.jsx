import React from 'react'
import { Link } from 'react-router-dom'
import { OrganizationCard } from '../../components/Cards/OrganizationCard'

export const ViewOrganizationPage = () => {
  return (

    <>
      <div className='container' style={{ marginTop: '6rem' }}>
        <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/organization.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
          <div className="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0">
            <div className="flex-grow-1 mt-2 me-9 me-md-0 p-5 Titletext">
              <div>
                <h1 className='d-flex align-items-center justify-content-center'>Gestionar Organizaciones</h1>
                <p className='d-flex align-items-center justify-content-center'>Administra las organizaciones del sistema</p>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <h4 className='text-font'>Organizaciones</h4>
          <Link to='add' className='btn btn-primary rounded-0'>Agregar Organización</Link>
        </div>
        <hr />
        <div>
        </div>
        <OrganizationCard></OrganizationCard>
      </div>
    </>

  )
}
