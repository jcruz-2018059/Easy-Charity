import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export const DetailOrganization = () => {
  const navigate = useNavigate();
  
  const logOut = () => {
    localStorage.clear()
    navigate('/')
  }
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [organization, setOrganization] = useState({});
  const [permission, setPermission] = useState(false);
  const [organizationId, setOrganizationId] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const getOrganization = async () => {
    try {
      if (id && id !== ':id') {
        setPermission(false);
        const { data } = await axios(`http://localhost:2651/co/get/${id}`, config);
        if (data) {
          setOrganization(data.organization);
        }
      } else {
        setPermission(true);
        const { data } = await axios('http://localhost:2651/co/getCo', config);
        if (data) {
          setOrganization(data.organization);
          setOrganizationId(data.organization._id);
          setOrganizationName(data.organization.name);
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error('Error getting organization.');
    }
  }

  const deleteOrganization = async ({ id, name }) => {
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
          const { data } = await axios.delete(`http://localhost:2651/co/deleteCo/${id}`, config);
          Swal.fire({
            title: data.message || 'Organización eliminada.',
            icon: 'info',
            timer: 4000
          })
          logOut();
        }
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: err.response.data.message || `Error eliminando al usuario :(`,
        icon: 'error',
        timer: 4000
      })
    }
  }

  const getOrganizationId = () => {
    if (Object.keys(organization).length > 0) {
      return organizationId || '';
    }
    return organizationId || '';
  };

  const getOrganizationName = () => {
    if (Object.keys(organization).length > 0) {
      return organizationName || '';
    }
    return organizationName || '';
  };

  useEffect(() => getOrganization, []);
  return (
    <>
      <section className="container pb-1 mb-lg-5" style={{ paddingTop: '9rem' }}>
        {/* Breadcrumb mobile */}

        <div className="row row-cols-1 row-cols-md-2 g-0 pb-2">
          {/* Image */}
          <div className="col order-md-2" style={{ backgroundImage: 'url(/src/assets/OrganizationDetail.png)', borderRadius: '.5rem .5rem .5rem 0' }}>
            <div style={{ height: '250px' }}></div>
          </div>

          {/* Text + Breadcrumb desktop */}
          <div className="col order-md-1">
            <nav className="d-none d-md-block py-3 mb-2 mb-lg-3" aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <i className="bx bx-home-alt fs-lg me-1">Caridad</i>
                </li>
                <li className="breadcrumb-item active" aria-current="page">{organization.name}</li>
              </ol>
            </nav>

            <div className=" rounded-3 p-4 p-lg-5 mt-n2 mt-md-0 me-md-n2" style={{ backgroundColor: '#FFF' }}>
              <div className="px-sm-3 px-xl-4 pt-4 py-md-3 py-lg-4 py-xl-5">
                <h1 className="pb-2 pb-xxl-3">{organization.name}</h1>
                <p className="pb-2 mb-4 mb-xxl-5">{organization.description}</p>
                {
                  permission === true ? (
                    <div className="d-xxl-flex align-items-center">
                      <Link to={`/start/organization/update/${organization._id}`} className="btn btn-primary shadow-primary btn-lg rounded-2">Editar</Link>
                    </div>
                  ) : <></>
                }

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-4 pb-2 py-md-4 py-lg-5">
        <div className="row pb-1">
          <div className="col-md-5 col-xl-4 text-center text-md-start pb-4 mb-2">
            <h2 className="h1 mb-lg-4">Apoya la causa</h2>
            <p className="pb-4 mb-1 mb-lg-3">¡Ayuda a cambiar vidas hoy! Únete a nosotros en nuestra misión para hacer del mundo un lugar mejor. ¡Dona ahora y sé parte del cambio positivo que juntos podemos lograr! #DonaParaCambiarVidas 💖🙏</p>
            {
              role === 'CLIENT' ? (
                <Link className="btn btn-danger shadow-primary btn-lg"> <i className='bi bi-box2-heart-fill'> <span style={{ fontStyle: 'normal' }}> Donar </span></i></Link>
              ) : <></>
            }
          </div>
          <div className="col-md-7 offset-xl-1">
            <div className=" rounded-3 p-4" style={{ backgroundColor: '#FFF' }}>
              <ul className="list-unstyled pb-3 mb-0 mb-lg-3">
                <h5>¿Donde aportar?</h5>
                <hr />
                <li className="d-flex mb-3">
                  <i className="bi bi-geo-alt-fill text-muted fs-xl  me-2"></i>
                  {organization.location}
                </li>
                <li className="d-flex mb-3">
                  <i className="bi bi-telephone text-muted fs-xl  me-2"></i>
                  (502) {organization.phone}
                </li>
                <li className="d-flex mb-3">
                  <i className="bi bi-envelope text-muted fs-xl  me-2"></i>
                  {organization.email}
                </li>
                <li className="d-flex mb-3">
                  <i className="bx bx-time text-muted fs-xl mt-1 me-2"></i>
                  <div>
                    <h5>Horario</h5>
                    <hr />
                    <div><span className="text-dark fw-semibold me-1">Mon – Fri:</span>9:00 am – 22:00 pm</div>
                    <div><span className="text-dark fw-semibold me-1">Sat – Sun:</span>9:00 am – 20:00 pm</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {
          permission === true ? (
            <>
              <h2 className="h4 text-danger pt-1 pt-lg-3 mt-4">Eliminar organización</h2>
              <p>Ten en cuenta los riesgos de eliminar tu organización antes de eliminarla, como no poder recibir más donaciones o voluntariado a través de nuestra aplicación.</p>
              <div className="form-check mb-4">
                <input type="checkbox" id="delete-account" className="form-check-input" />
                <label htmlFor="delete-account" className="form-check-label fs-base">Entiendo, quiero eliminar mi organización.</label>
              </div>
              <button onClick={(e) => { deleteOrganization({ id: getOrganizationId(), name: getOrganizationName() }), e.preventDefault() }} type="button" className="btn btn-danger shadow-primary btn-lg rounded-2">Eliminar</button>
            </>
          ) : <></>
        }
      </section>

    </>
  )
}
