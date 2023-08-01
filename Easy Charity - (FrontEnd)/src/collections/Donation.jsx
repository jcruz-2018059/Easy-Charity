import React from 'react'
import { Link } from "react-router-dom";

export const Donation = ({id, name, description, date, amount, paymentMethod}) => {
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{new Date(date).toLocaleDateString()}</td>
            <td>{paymentMethod}</td>
            <td><Link to={`bill/${id}`} className='btn btn-danger rounded-0' >Ver factura</Link></td>
            <td>Q {amount}.00</td>
        </>
    )
}
