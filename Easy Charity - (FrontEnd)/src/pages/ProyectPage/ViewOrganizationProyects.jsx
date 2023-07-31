import { ProyectCard } from '../../components/Cards/ProyectCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ViewOrganizationProyectsPage = () => {
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [projects, setProjects] = useState([])
  const [organization, setOrganization] = useState('');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const getProjects = async () => {
    try {
      if (id && id !== ':id') {
        const { data } = await axios(`http://localhost:2651/project/get/${id}`);
        if (data) {
          setProjects(data.projects);
          setOrganization(data.organizationName.name);
        }
      } else {
        const { data } = await axios('http://localhost:2651/project/getByLoggedUser', config);
        if (data) {
          console.log(data.projects)
          setProjects(data.projects);
          setOrganization(data.organizationName);
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error('Error getting proyects.');
    }
  }

  const deleteProject = async (id, name) => {
    try {
      Swal.fire({
        title: `¿Estás seguro de eliminar ${name}? Cerrarás sesión luego de esta acción.`,
        icon: 'warning',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Sí, eliminar`,
      }).then(async (result) => {
        if (result.isDenied) {
          const response = await axios.delete(`http://localhost:2651/project/delete/${id}`, config);
          if (response.status === 200) {
            // Project successfully deleted, handle any other necessary actions
            Swal.fire({
              title: response.data.message || 'Proyecto eliminado.',
              icon: 'info',
              timer: 4000,
            });
            getProjects()
            // Perform any other actions you want after successful deletion.
          }
        }
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: err.response.data.message || `Error eliminando el proyecto :(`,
        icon: 'error',
        timer: 4000,
      });
    }
  };

  useEffect(() => getProjects, [id]);

  const getOrganizationName = () => {
    if (projects.length > 0) {
      return organization || '';
    }
    return organization || '';
  };
  return (
    <>
      <div className='container' style={{ marginTop: '6rem' }}>
        <div className="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10" style={{ background: `url(/src/assets/Proyects.png) no-repeat center center / cover`, backgroundColor: '#B82727' }}>
          <div className="card-body d-flex justify-content-center flex-wrap ps-xl-15 pe-0">
            <div className="flex-grow-1 mt-2 me-9 me-md-0 p-5 Titletext">
              <div>
                <h1 className='d-flex align-items-center justify-content-center'>Proyectos de {getOrganizationName()} </h1>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <h4 className='text-font'>Proyectos</h4>
          {
            role == 'ORGANIZATION ADMIN' ? (
              <Link to={`/start/proyects/add`} className='btn btn-primary rounded-0'>Agregar Proyectos</Link>
            ) : <></>
          }
        </div>
        <hr />
        <div className='row g-0'>
          {
            projects.length === 0 ? (
              <>
                <div className='container justify-content-center align-items-center' style={{ borderColor: 'red', height: 300, display: 'flex' }}>
                  <p className='fw-bold' style={{ color: '#a6a6a6' }} > {getOrganizationName()} aún no tiene proyectos activos. </p>
                </div>
              </>
            ) :
              projects.map(({ _id, name, description, organization }, index) => {
                const organizationName = organization ? organization.name : 'Sin organización';
                return (
                  <ProyectCard key={index}
                    id={_id}
                    name={name}
                    description={description}
                    organization={organizationName}
                    permission={true}
                    onCliick={() => deleteProject(_id, name)}
                  ></ProyectCard>
                )
              })
          }
        </div>
      </div>
    </>
  )
}
