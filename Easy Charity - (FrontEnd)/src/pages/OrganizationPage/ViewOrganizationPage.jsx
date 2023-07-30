import { Link } from 'react-router-dom'
import { OrganizationCard } from '../../components/Cards/OrganizationCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const ViewOrganizationPage = () => {
  const role = localStorage.getItem('role')
  const [organizations, setOrganizations] = useState([{}])
    const getOrganizations = async () => {
        try {
            const { data } = await axios('http://localhost:2651/co/getCoLogut');
            if (data){
              setOrganizations(data.organizations);
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Organizations');
        }
    }

    useEffect(() => getOrganizations, []);
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
          {
            role == 'ADMIN'?(
            <Link to='add' className='btn btn-primary rounded-0'>Agregar Organización</Link>  
            ): <></>
          }
        </div>
        <hr />
        <div className='row g-0'>
          {
            organizations.length === 0 ? (
              <>
              <div className='container justify-content-center align-items-center' style={{borderColor: 'red', height: 300, display: 'flex'}}>
                <p className='fw-bold'  style={{color: '#a6a6a6'}} >No hay organizaciones por el momento.</p>
              </div>
              </>
            ) : (
              organizations.map(({name, description, _id}, i) =>{
                return(
                  <OrganizationCard
                    name={name}
                    description={description}
                    id={_id}
                    key={i}
                  ></OrganizationCard>
                )
              })
            )
          }
          </div>
      </div>
    </>

  )
}
