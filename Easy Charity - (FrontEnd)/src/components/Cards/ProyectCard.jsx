import React from 'react';
import { Link } from 'react-router-dom';



export const ProyectCard = ({ id, name, description, organization, permission, onCliick }) => {
  const role = localStorage.getItem('role');
  const isOrganizationAdmin = role === 'ORGANIZATION ADMIN';

  return (
    <>
      <div className="card m-2 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '40rem' }}>
        <img className="card-img-top" src="/src/assets/Proyect.svg" alt="Imagen" />
        <div className="card-body p-3">
          <h5 className="card-title text-font">{name}</h5>
          <span className="text-primary">Organización: {organization} </span>
          <p className="card-text text-font" style={{ fontSize: '12px' }}>{description}</p>
        </div>
        <div className="d-grid">
          <Link to={`/start/proyects/detailproyect/${id}`} type="button" className="btn btn-primary mx-3 mb-3 rounded-0">Ver más</Link>
          {isOrganizationAdmin && permission === true ? (
            <>
              <Link to={`/start/proyects/update/${id}`} type="button" className="btn btn-warning primary mx-3 mb-3 rounded-0">Editar</Link>
              <button onClick={onCliick} type="button" className="btn btn-danger primary mx-3 mb-3 rounded-0">Eliminar</button>   
              <Link to={`/start/proyects/volunterbyproject/${id}`} type="button" className="btn btn-success primary mx-3 mb-3 rounded-0">Ver voluntarios</Link>  
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};