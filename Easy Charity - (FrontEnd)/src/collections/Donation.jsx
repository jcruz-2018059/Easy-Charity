import React from 'react'

export const Donation = ({name, description, date, amount, paymentMethod}) => {
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{new Date(date).toLocaleDateString()}</td>
            <td>{paymentMethod}</td>
            <td>Q {amount}.00</td>
        </>
    )
}
