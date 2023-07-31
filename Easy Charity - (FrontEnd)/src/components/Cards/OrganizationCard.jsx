import { Link } from "react-router-dom"

export const OrganizationCard = ({name, description, id}) => {
    const role = localStorage.getItem('role')
    return (
        <>
            <div className="card m-2 row g-0 rounded-0" style={{ maxWidth: '18rem', maxHeight: '40rem' }}>
                <img className="card-img-top" src="/src/assets/Org.svg" alt="Imagen" />
                <div className="card-body p-3">
                    <h5 className="card-title text-font">{name}</h5>
                    <p className="card-text text-font" style={{ fontSize: '12px' }}> {description} </p>
                </div>
                <div className="d-grid">
                    {
                        role === 'ADMIN' ? (
                            <Link to={`../proyects/${id}`} className="btn btn-success mx-3 my-2 rounded-0">
                                <button type="button" className="btn btn-success">Ver Proyectos</button>
                            </Link>
                        ) : null
                    }
                    <Link to={`${id}`} className="btn btn-primary mx-3 mb-3 rounded-0">
                        <button type="button" className="btn btn-primary ">Ver más</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
