import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const BillPage = () => {
    const { id } = useParams();

    const [bill, setBill] = useState({});
    const [donation, setDonation] = useState({});

    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getBill = async () => {
        try {
            const { data } = await axios(`http://localhost:2651/bill/getBillByDonation/${id}`, config);
            if (data) {
                console.log(data)
                setBill(data.bills);
                setDonation(data.donation)
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting bills.');
        }
    }

    const formatBalance = (total) => {
        if (typeof total === 'number') {
          return total.toLocaleString('en-US', { useGrouping: true });
        }
        return total;
      };

    useEffect(() => getBill, []);
    return (
        <>
  <div className='container' style={{ maxWidth: '40rem', maxHeight: '40rem', paddingTop: '6rem' }}>
    <div className="row align-items-md-stretch">
      <div className="col-md-12">
        <div className="h-100 card text-white " style={{ backgroundColor: '#B82727' }}>
          <div className="card-header">Tu aporte</div>
          <div className="card-body p-5 text-center">
            <h1 className="card-title text-white text-font" style={{ fontSize: '5rem' }}>Q {formatBalance(bill.total)}.00</h1>
            <p className="card-text fs-sm">Gracias por tu apoyo.</p>
            <div className="p-5 rounded-3">
              <h2>Información</h2>
              <div className="rounded-3 p-4">
                <ul className="list-unstyled pb-3 mb-0 mb-lg-3">
                  <p className='fw-bold'>{bill.name} {bill.surname}</p>
                  <li className="d-flex mb-3">
                    <i className="bi bi-calendar-check fs-xl me-2 text-white"></i>
                    {new Date(bill.date).toLocaleDateString()}
                  </li>
                  <li className="d-flex mb-3 ">
                    <i className="bi bi-credit-card-2-back-fill fs-xl me-2 text-white"></i>
                    {donation.paymentMethod}
                  </li>
                  <li className="d-flex mb-3">
                    <i className="bi bi-chat-dots fs-xl me-2 text-white"></i>
                    {donation.description}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
    )
}
