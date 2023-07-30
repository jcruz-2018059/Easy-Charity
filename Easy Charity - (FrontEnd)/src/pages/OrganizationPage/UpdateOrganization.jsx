import React from 'react'
import { Link } from 'react-router-dom'

export const UpdateOrganization = () => {
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
                <li className="breadcrumb-item active" aria-current="page"></li>
              </ol>
            </nav>

            <div className=" rounded-3 p-4 p-lg-5 mt-n2 mt-md-0 me-md-n2" style={{ backgroundColor: '#FFF' }}>
              <div className="px-sm-3 px-xl-4 pt-4 py-md-3 py-lg-4 py-xl-5">
                <input type="text" className="form-control form-control-lg" id="name" required />
                <br />
                <input type="text" className="form-control form-control-lg" id="name" required />
                <br />
                <div className="d-xxl-flex align-items-center">
                  <Link to={'/start/organization/update/:id'} className="btn btn-primary shadow-primary btn-lg rounded-2">Guardar Cambios</Link>
                </div>
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
            <Link className="btn btn-danger shadow-primary btn-lg"> <i className='bi bi-box2-heart-fill'> <span style={{ fontStyle: 'normal' }}> Donar </span></i></Link>
          </div>
          <div className="col-md-7 offset-xl-1">
            <div className=" rounded-3 p-4" style={{ backgroundColor: '#FFF' }}>
              <ul class="list-unstyled pb-3 mb-0 mb-lg-3">
                <li class="d-flex mb-3">
                  <i class="bi bi-geo-alt-fill text-muted fs-xl  me-2"></i>
                </li>
                <input type="text" className="form-control form-control-lg" id="name" required />
                <li class="d-flex mb-3">
                  <i class="bi bi-telephone text-muted fs-xl  me-2"></i>
                </li>
                <input type="text" className="form-control form-control-lg" id="name" required />
                <li class="d-flex mb-3">
                  <i class="bi bi-envelope text-muted fs-xl  me-2"></i>
                </li>
                <input type="text" className="form-control form-control-lg" id="name" required />
                <li class="d-flex mb-3">
                  <i class="bx bx-time text-muted fs-xl mt-1 me-2"></i>
                  <div>
                    <h5>¿Donde aportar?</h5>
                    <hr />
                    <div><span class="text-dark fw-semibold me-1">Mon – Fri:</span>9:00 am – 22:00 pm</div>
                    <div><span class="text-dark fw-semibold me-1">Sat – Sun:</span>9:00 am – 20:00 pm</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
