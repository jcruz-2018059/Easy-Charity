import React from 'react'

export const ViewAcountPage = () => {
  return (
      
      <>
      <div className="container" style={{marginTop: '4.5rem'}}>
        
      <div className="col-md-8 offset-lg-1 pb-5 mb-2 mb-lg-4 pt-md-5 mt-n3 mt-md-0 d-flex justify-content-center">
      <div className="ps-md-3 ps-lg-0 mt-md-2 py-md-4">
        <h1 className="h2 pt-xl-1 pb-3 text-font">Detalle de Cuenta</h1>

        {/* Basic info */}
        <h2 className="h5 text-primary text-font mb-4">Información Básica</h2>
        <form className="needs-validation border-bottom pb-3 pb-lg-4" noValidate>
          <div className="row pb-2">
            <div className="col-sm-6 mb-4">
              <label htmlFor="fn" className="form-label fs-base">Nombre</label>
              <input type="text" id="fn" className="form-control form-control-lg" defaultValue="John" required />
              <div className="invalid-feedback">Please enter your first name!</div>
            </div>
            <div className="col-sm-6 mb-4">
              <label htmlFor="sn" className="form-label fs-base">Apellido</label>
              <input type="text" id="sn" className="form-control form-control-lg" defaultValue="Doe" required />
              <div className="invalid-feedback">Please enter your second name!</div>
            </div>
            <div className="col-sm-6 mb-4">
              <label htmlFor="email" className="form-label fs-base">Correo Electrónico</label>
              <input type="email" id="email" className="form-control form-control-lg" defaultValue="john@example.com" required />
              <div className="invalid-feedback">Please provide a valid email address!</div>
            </div>
            <div className="col-sm-6 mb-4">
              <label htmlFor="phone" className="form-label fs-base">Teléfono<small className="text-muted">(optional)</small></label>
              <input type="text" id="phone" className="form-control form-control-lg" data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}" placeholder="+1 ___ ___ __" />
            </div>
          </div>
          <div className=" mb-5">
              <label htmlFor="phone" className="form-label fs-base">Nombre de usuario<small className="text-muted"></small></label>
              <input type="text" id="phone" className="form-control form-control-lg" />
            </div>
          <div className="d-flex mb-3">
            <button type="reset" className="btn btn-secondary me-3 rounded-0">Cancel</button>
            <button type="submit" className="btn btn-primary rounded-0">Save changes</button>
          </div>
        </form>

        {/* Delete account */}
        <h2 className="h5 text-primary pt-1 pt-lg-3 mt-4">Delete account</h2>
        <p>When you delete your account, your public profile will be deactivated immediately. If you change your mind before the 14 days are up, sign in with your email and password, and we’ll send you a link to reactivate your account.</p>
        <div className="form-check mb-4">
          <input type="checkbox" id="delete-account" className="form-check-input" />
          <label htmlFor="delete-account" className="form-check-label fs-base">Yes, I want to delete my account</label>
        </div>
        <button type="button" className="btn btn-danger">Delete</button>
      </div>
    </div>
    </div>
      </>

  )
}
