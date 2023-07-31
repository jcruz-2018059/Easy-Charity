import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


export const UpdateProyectPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [project, setProject] = useState({});
  const config = {
    headers: {
      Authorization: `${token}`
    }
  }

  const getProject = async () => {
    try {
        const { data } = await axios(`http://localhost:2651/project/getById/${id}`, config);
        if (data) {
          setProject(data.project);
        }
    } catch (err) {
      console.log(err);
      throw new Error('Error getting project.');
    }
  }

  const updateProject = async()=>{
    try {
        let project = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            budget: document.getElementById('budget').value,
            type: document.getElementById('type').value
        }
        const { data } = await axios.put(`http://localhost:2651/project/update/${id}`,project ,config);
        Swal.fire({
            title: data.message || '¡Proyecto actualizado!',
            icon: 'success',
            timer: 4000
        });
        navigate('../');
    } catch (err) {
        console.error(err);
        Swal.fire({
            title: err.response.data.message || `Error actualizando proyecto :(`,
            icon: 'error',
            timer: 4000
        });
    }
}
    const getFormattedDate = (dateString) => {
        if (dateString) {
        return new Date(dateString).toISOString().split('T')[0];
        }
        return '';
    };
    const handleTypeChange = (event) => {
        setProject({ ...project, type: event.target.value });
      };
  useEffect(() => getProject,[]);
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 20 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-9">
                            <div className="card border border-white">
                                <div className="text-center mb-3 pt-5">
                                    <h1 className=" card-title text-danger">Editar Proyecto</h1>
                                </div>
                                <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                    <div className="card-body">
                                        <form className="row g-4 needs-validation" noValidate>
                                            <div className="col-12">
                                                <label htmlFor="fn" className="form-label fs-base">Nombre</label>
                                                <input defaultValue={project.name} type="text" className="form-control form-control-lg" id="name" required />
                                            </div>
                                            <div className="col-12 pb-3">
                                                <label htmlFor="email" className="form-label fs-base">Description</label>
                                                <textarea defaultValue={project.description} type="text" className="form-control form-control-lg" id="description" required placeholder='Describe tu proyecto' />
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label htmlFor="" className="form-label fs-base">Fecha de inicio</label>
                                                    <input defaultValue={getFormattedDate(project.startDate)} type="date" className="form-control form-control-lg" id="startDate" required />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="time" className="form-label fs-base">Fecha de finalización</label>
                                                    <input defaultValue={getFormattedDate(project.endDate)} type="date" className="form-control form-control-lg" id="endDate" required />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Presupuesto</label>
                                                <input defaultValue={project.budget} type="number" className="form-control form-control-lg" id="budget" required placeholder='Q 0.00' />
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="time" className="form-label fs-base">Tipo</label>
                                                <select  value={project.type} onChange={handleTypeChange} className="form-select form-select-lg" id="type" required>
                                                    <option value="caridad">Elegir</option>
                                                    <option value="caridad">Caridad</option>
                                                    <option value="recaudación">Recaudación</option>
                                                    <option value="voluntariado">Voluntariado</option>
                                                </select>
                                            </div>
                                            <div className="col-12 pt-2 pt-sm-3">
                                                <Link to={'../'}>
                                                    <button onClick={(e)=>{updateProject(), e.preventDefault()}} type="submit" className="btn btn-primary w-100 w-sm-auto">Guardar Cambios</button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
