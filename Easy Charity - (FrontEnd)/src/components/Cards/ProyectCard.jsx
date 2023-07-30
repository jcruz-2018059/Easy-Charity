import React from 'react'

export const ProyectCard = ({name, description, organization}) => {
    return (
        <>
            <div className="card m-2 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '40rem' }}>
                <img className="card-img-top" src="/src/assets/Proyect.svg" alt="Imagen" />
                <div className="card-body p-3">
                    <h5 className="card-title text-font">{name}</h5>
                    <span className='text-primary'>Organización: {organization} </span>
                    <p className="card-text text-font" style={{ fontSize: '12px' }}>{description}</p>
                    
                </div>
                <div className="d-grid">
                    <button type="button" className="btn btn-primary mx-3 mb-3 rounded-0">Ver más</button>
                </div>
            </div>
        </>
    )
}