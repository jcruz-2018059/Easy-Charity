import { ProyectCard } from '../../components/Cards/ProyectCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const ViewProyectPage = () => {
    const [projects, setProjects] = useState([{}])
    const getProjects = async () => {
        try {
            const { data } = await axios('http://localhost:2651/project/get');
            if (data){
              setProjects(data.projects);
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Users');
        }
    }

    useEffect(() => getProjects, []);
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
        <div className='row g-0'>
        {
          projects.length === 0 ? (
            <>
              <div className='container justify-content-center align-items-center' style={{borderColor: 'red', height: 300, display: 'flex'}}>
                <p className='fw-bold'  style={{color: '#a6a6a6'}} >Aún no hay proyectos disponibles.</p>
              </div>
            </>
          ) : 
          projects.map(({name, description, organization}, index) =>{
            const organizationName = organization ? organization.name : 'Sin organización';
            return(
              <ProyectCard key={index}
                name={name}
                description={description}
                organization={organizationName}
              ></ProyectCard>
            )
        })
      }
      </div>
      </div>
    </>
  )
}
