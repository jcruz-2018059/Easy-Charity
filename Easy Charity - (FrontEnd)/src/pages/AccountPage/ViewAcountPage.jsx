import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export const ViewAcountPage = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [user, setUser] = useState({});
  const config = {
    headers: {
      Authorization: `${token}`
    }
  };
  let rol;
  if (role === 'ADMIN') {
    rol = 'Administrador';
  } else if(role === 'ORGANIZATION ADMIN') {
    rol = 'Admin. Organización';
  } else {
    rol = 'Cliente';
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:2651/user/account', config);
      if (data) {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
      throw new Error('Error getting User');
    }
  };

  const updateUser = async () => {
    try {
        let user = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            username: document.getElementById('username').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
        }
        const { data } = await axios.put('http://localhost:2651/user/update', user, config)
            Swal.fire({
                title: data.message || '¡Usuario actualizado!',
                icon: 'success',
                timer: 4000
        })
        getUser();
    } catch (err) {
        console.error(err)
        Swal.fire({
            title: err.response.data.message || 'Error updating user',
            icon: 'error',
            timer: 4000
        })
    }
}
  useEffect(() => {getUser();}, []);
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
              <input type="text" id="name" className="form-control form-control-lg" defaultValue={user.name}/>
              <div className="invalid-feedback">¡El nombre es requerido!</div>
            </div>
            <div className="col-sm-6 mb-4">
              <label htmlFor="sn" className="form-label fs-base">Apellido</label>
              <input type="text" id="surname" className="form-control form-control-lg" defaultValue={user.surname}/>
              <div className="invalid-feedback">¡El apellido es requerido!</div>
            </div>
            <div className="col-sm-6 mb-4">
              <label htmlFor="email" className="form-label fs-base">Correo Electrónico</label>
              <input type="email" id="email" className="form-control form-control-lg" defaultValue={user.email}/>
              <div className="invalid-feedback">¡El correo es requerido!</div>
            </div>
            <div className="col-sm-6 mb-4">
              <label htmlFor="phone" className="form-label fs-base">Teléfono</label>
              <input type="text" id="phone" className="form-control form-control-lg" data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}" placeholder="+1 ___ ___ __" defaultValue={user.phone}/>
            </div>
            <div className="col-sm-6 mb-4">
              <label htmlFor="phone" className="form-label fs-base">Nombre de usuario<small className="text-muted"></small></label>
              <input type="text" id="username" className="form-control form-control-lg" defaultValue={user.username} />
            </div>
            <div className="col-sm-6 mb-4" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>Rol: <h4 style={{ color: '#b82727', fontSize: 25, marginLeft: 10}}>{rol}</h4></div>
          </div>
          {
            role !== 'ADMIN' ? (
              <div className="d-flex mb-3">
                <button onClick={(e) => (e.preventDefault(), updateUser())} type="submit" className="btn btn-primary">Actualizar datos</button>
              </div>
            ) : <></>
          }
          
        </form>

        {/* Delete account */}
        {
          role === 'CLIENT' ? (
            <>
              <h2 className="h5 text-primary pt-1 pt-lg-3 mt-4">Eliminar cuenta</h2>
              <p>Ten en cuenta los riesgos de eliminar tu cuenta.</p>
              <div className="form-check mb-4">
                <input type="checkbox" id="delete-account" className="form-check-input" />
                <label htmlFor="delete-account" className="form-check-label fs-base">Sí, quiero eliminar mi cuenta.</label>
              </div>
              <button type="button" className="btn btn-danger">Eliminar</button>
            </>
          ) : <></>
        }
        
      </div>
    </div>
    </div>
      </>

  )
}
