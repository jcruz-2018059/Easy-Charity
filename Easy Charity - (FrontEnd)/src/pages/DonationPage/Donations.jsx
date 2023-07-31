import React from "react"
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Donation } from "../../collections/Donation"

export const Donations = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const [donations, setDonations] = useState([{}])
    const [total, setTotal] = useState()
    const getDonation = async () => {
        try {
            const { data } = await axios('http://localhost:2651/donation/get', config);
            if (data) {
                setDonations(data.donations);
                setTotal(data.total);
                console.log(data)
            }
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Users');
        }
    }

    useEffect(() => getDonation, []);
    return (
        <>
            <div className="container" style={{ paddingTop: '6rem' }}>
                <h3 style={{ textAlign: 'right' }}>Total Donado Q {total}</h3>
                <h2 style={{ textAlign: 'left' }}>Donaciones</h2>

                <div style={{ backgroundColor: '#B82727', textAlign: 'left', height: 10, width: 350, borderRadius: 50 }}></div>
                <br />
                <table className="table">
                    <thead className="">
                        <tr>
                            <th scope="col">Proyecto</th>
                            <th style={{ color: 'red' }} scope="col">Descripción</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Método de Pago</th>
                            <th style={{ color: 'red' }} scope="col">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donations.map(({_id, project: { name: nameProject} = {}, description, amount, date, paymentMethod}, index) => {
                                const id = _id;
                                return (
                                    <tr className="text-dark" key={index}>
                                        <Donation
                                            name={nameProject}
                                            description={description}
                                            amount={amount}
                                            date={date}
                                            paymentMethod={paymentMethod}
                                        ></Donation>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}