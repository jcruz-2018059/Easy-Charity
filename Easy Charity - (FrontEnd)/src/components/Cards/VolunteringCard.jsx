import React from 'react'
import { Link } from 'react-router-dom'

export const VolunteringCard = ({ id, name, surname, dpi, description, age, proyect, startDate, endDate, state }) => {
  const badgeColor = state ? 'success' : 'danger';
  const badgeText = state ? 'Activo' : 'Cancelado';

  return (
    <>
      <div className="card m-2 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '40rem' }}>
        <img className="card-img-top" src="/src/assets/header.png" alt="Imagen" />
        <div className="card-body p-3">
          <h5 className="card-title text-font">{proyect}</h5>
          <span className="text-primary"></span>
          <p className="card-text text-font" style={{ fontSize: '14px' }}> <span className='fw-bold'>Nombre</span> {name} {surname}</p>
          <p className="card-text text-font" style={{ fontSize: '14px' }}> <span className='fw-bold'>DPI</span> {dpi}</p>
          <p className="card-text text-font" style={{ fontSize: '14px' }}> <span className='fw-bold'>Descripción</span> {description}</p>
          <p className="card-text text-font" style={{ fontSize: '14px' }}> <span className='fw-bold'>Fecha de inicio</span> {new Date(startDate).toLocaleDateString()}</p>
          <p className="card-text text-font" style={{ fontSize: '14px' }}> <span className='fw-bold'>Fecha de finalización</span> {new Date(endDate).toLocaleDateString()}</p>
          <p className="card-text text-font" style={{ fontSize: '14px' }}> <span className='fw-bold'>Edad</span> {age}</p>
          <p className="card-text text-font" style={{ fontSize: '14px' }}> <span className='fw-bold '>Estado</span> <span className={`badge text-bg-${badgeColor}`}>{badgeText}</span></p>
        </div>
        <div className="d-grid">
          <Link to={`update/${id}`} type="button" className="btn btn-outline-danger mx-3 mb-3 rounded-0">Editar</Link>
          <Link type="button" className="btn btn-danger primary mx-3 mb-3 rounded-0">Cancelar</Link>
        </div>
      </div>
    </>
  );
};