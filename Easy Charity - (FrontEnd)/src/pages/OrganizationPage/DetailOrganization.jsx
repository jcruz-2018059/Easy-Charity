import React from 'react'

export const DetailOrganization = () => {
  return (
    <>
      <section className="container pt-4 pb-5 mb-lg-5">
      {/* Breadcrumb mobile */}
      <nav className="d-md-none pb-3 mb-2 mb-lg-3" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="index.html"><i className="bx bx-home-alt fs-lg me-1"></i>Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Services</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Dental Care</li>
        </ol>
      </nav>

      <div className="row row-cols-1 row-cols-md-2 g-0 pb-2">
        {/* Image */}
        <div className="col order-md-2 position-relative bg-position-center bg-size-cover bg-repeat-0 zindex-2" style={{ backgroundImage: 'url(assets/img/services/single/dental.jpg)', borderRadius: '.5rem .5rem .5rem 0' }}>
          <div style={{ height: '250px' }}></div>
        </div>

        {/* Text + Breadcrumb desktop */}
        <div className="col order-md-1">
          <nav className="d-none d-md-block py-3 mb-2 mb-lg-3" aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="index.html"><i className="bx bx-home-alt fs-lg me-1"></i>Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Services</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Dental Care</li>
            </ol>
          </nav>

          <div className=" rounded-3 p-4 p-lg-5 mt-n2 mt-md-0 me-md-n2" style={{backgroundColor:'#FFF'}}>
            <div className="px-sm-3 px-xl-4 pt-4 py-md-3 py-lg-4 py-xl-5">
              <h1 className="pb-2 pb-xxl-3">Dental Care</h1>
              <p className="pb-2 mb-4 mb-xxl-5">Vestibulum nunc lectus auctor quis natoque lectus tortor lacus, eu nunc feugiat nisl maecenas nulla hac morbi. Sollicitudin cursus in habitasse adipiscing  sed aenean sapien maecenas lectus auctor. Non feugiat feugiat egestas nulla nec. Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros.</p>
              <div className="d-xxl-flex align-items-center">
                <a href="#" className="btn btn-primary shadow-primary btn-lg">Make an appointment</a>
                <ul className="list-unstyled ps-xxl-4 pt-4 pt-xxl-0 ms-xxl-2">
                  <li><strong>Mon — Fri:</strong> 9:00 am — 22:00 am</li>
                  <li><strong>Sat — Sun:</strong> 9:00 am — 20:00 am</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="container pt-4 pb-2 py-md-4 py-lg-5">
        <div className="row pb-1">
          <div className="col-md-5 col-xl-4 text-center text-md-start pb-4 mb-2">
            <h2 className="h1 mb-lg-4">Our prices for best results</h2>
            <p className="pb-4 mb-1 mb-lg-3">Nisi augue at ridiculus  ullamcorper ibendum  nunc dignissim habitasse in mollis orci. Elementum duis ultricies vehicula nullam tristique.</p>
            <a href="#" className="btn btn-primary shadow-primary btn-lg">Make an appointment</a>
          </div>
          <div className="col-md-7 offset-xl-1">
            <div className=" rounded-3 p-4" style={{backgroundColor:'#FFF'}}>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mx-sm-3 mb-4">
                <span className="fs-xl fw-500">Surgery and Implantation</span>
                <span>from<span className="h5 ms-2 mb-0">$120</span></span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mx-sm-3 mb-4">
                <span className="fs-xl">Full teeth cleaning</span>
                <span>from<span className="h5 ms-2 mb-0">$1,200</span></span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mx-sm-3 mb-4">
                <span className="fs-xl">Therapeutic dentistry</span>
                <span>from<span className="h5 ms-2 mb-0">$500</span></span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mx-sm-3 mb-4">
                <span className="fs-xl">Aesthetic dentistry</span>
                <span>from<span className="h5 ms-2 mb-0">$2,000</span></span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mx-sm-3 mb-4">
                <span className="fs-xl">Professional oral hygiene</span>
                <span>from<span className="h5 ms-2 mb-0">$100</span></span>
              </div>
              <div className="d-flex justify-content-between align-items-center mx-3">
                <span className="fs-xl">Full teeth cleaning</span>
                <span>from<span className="h5 ms-2 mb-0">$1,300</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
