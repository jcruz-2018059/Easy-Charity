import React from 'react'
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export const MethodPayment = () => { 
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showDonationForm, setShowDonationForm] = useState(false);

    const addDonate = async () => {
        try {
            let donate = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                amount: document.getElementById('amount').value,
                description: document.getElementById('description').value,
                paymentMethod: selectedMethod,
                card: document.getElementById('card').value,
                project: id
            }
            await axios.post(`http://localhost:2651/donation/add/${id}`, donate, config);
            Swal.fire({
                title: '¡Donación exitosa!',
                icon: 'success',
                timer: 4000
            })
            navigate('../');
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: err.response.data.message || `Error en la donación :(`,
                icon: 'error',
                timer: 4000
            })
        }
    }

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
        setShowDonationForm(true);
    };

    const volver = () => {
        setShowDonationForm(false);
    };
    return (

        <>
            {!showDonationForm && (
                <div className="col-md-8 offset-lg-1 pb-5 mb-2 mb-lg-4 pt-md-5 " style={{marginTop:'6rem'}}>
                    <div className="ps-md-3 ps-lg-0 mt-md-2 pt-md-4 pb-md-2">
                        <h1 className="h2 pt-xl-1 mb-3 pb-2 pb-lg-3">Métodos de Pago</h1>
                        <h2 className="h5 text-primary mb-4">Tus métodos de pago disponibles</h2>

                        {/* Item */}
                        <div className="card d-sm-flex flex-sm-row align-items-sm-center justify-content-between border-0 shadow-sm p-3 p-md-4 mb-4">
                            <div className="d-flex align-items-center pe-sm-3">
                                <img src="/src/assets/mastercard.svg" width="84" alt="Mastercard" />
                                <div className="ps-3 ps-sm-4">
                                    <h6 className="mb-2">Master Card</h6>
                                    <div className="fs-sm">Expiration 09/26</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end pt-3 pt-sm-0">
                                <button type="button" className="btn btn-outline-danger px-3 px-xl-4" onClick={() => handleSelectMethod('MasterCard')}>
                                    <i className="bx bx-trash-alt fs-xl me-lg-1 me-xl-2"></i>
                                    <span className="d-none d-lg-inline">Seleccionar</span>
                                </button>
                            </div>
                        </div>

                        {/* Item */}
                        <div className="card d-sm-flex flex-sm-row align-items-sm-center justify-content-between border-0 shadow-sm p-3 p-md-4 mb-4">
                            <div className="d-flex align-items-center pe-sm-3">
                                <img src="/src/assets/visa.svg" width="84" alt="Visa" />
                                <div className="ps-3 ps-sm-4">
                                    <h6 className="mb-2">Visa</h6>
                                    <div className="fs-sm">Expiration 11/25</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end pt-3 pt-sm-0">
                                <button type="button" className="btn btn-outline-danger px-3 px-xl-4" onClick={() => handleSelectMethod('Visa')}>
                                    <i className="bx bx-trash-alt fs-xl me-lg-1 me-xl-2"></i>
                                    <span className="d-none d-lg-inline">Seleccionar</span>
                                </button>
                            </div>
                        </div>

                        {/* Item */}
                        <div className="card d-sm-flex flex-sm-row align-items-sm-center justify-content-between border-0 shadow-sm p-3 p-md-4 mb-4">
                            <div className="d-flex align-items-center pe-sm-3">
                                <img src="/src/assets/paypal.svg" width="84" height="50" alt="Amex" />
                                <div className="ps-3 ps-sm-4">
                                    <h6 className="mb-2">PayPal</h6>
                                    <div className="fs-sm">Expiration 03/26</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end pt-3 pt-sm-0">
                                <button type="button" className="btn btn-outline-danger px-3 px-xl-4" onClick={() => handleSelectMethod('PayPal')}>
                                    <i className="bx bx-trash-alt fs-xl me-lg-1 me-xl-2"></i>
                                    <span className="d-none d-lg-inline">Seleccionar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDonationForm && selectedMethod && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 10 }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-7 col-md-9">
                                <div className="card border border-white">
                                    <div className='card-header d-flex justify-content-between' >
                                    <img src={`/src/assets/${selectedMethod}.svg`} width="84" height="50" alt="Visa" />
                                    <button onClick={()=> volver()} className='btn btn-danger w-sm-auto'>Elegir otro método</button>
                                    </div>
                                    <div className="text-center mb-3 pt-5">
                                        <h1 className=" card-title ">Donar</h1>
                                    </div>
                                    <div className="card-body p-4 p-md-5" style={{ marginTop: -60 }}>
                                        <div className="card-body">
                                            <form className="row g-4 needs-validation" noValidate>
                                                <div className="col-sm-6">
                                                    <label htmlFor="" className="form-label fs-base">Nombre</label>
                                                    <input placeholder="Nombre" type="text" className="form-control form-control-lg" id="name" required />

                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="time" className="form-label fs-base">Apellido</label>
                                                    <input placeholder="Apellido" type="text" className="form-control form-control-lg" id="surname" required />

                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="fn" className="form-label fs-base">Monto</label>
                                                    <input placeholder="Monto" type="text" className="form-control form-control-lg" id="amount" required />

                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="email" className="form-label fs-base">Descripción</label>
                                                    <textarea placeholder="Descripción" type="text" className="form-control form-control-lg" id="description" required />

                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="email" className="form-label fs-base">No. Targeta</label>
                                                    <input placeholder="No. Targeta" type="text" className="form-control form-control-lg" id="card" required />

                                                </div>
                                                <div className="col-12 pt-2 pt-sm-3">
                                                    <button onClick={(e)=>{addDonate(), e.preventDefault()}} type="submit" className="btn btn-danger w-100 w-sm-auto">Guardar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
