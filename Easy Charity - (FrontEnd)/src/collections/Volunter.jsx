import React from 'react';

export const Volunter = ({ id, name, surname, dpi, email, phone, age, description, skills, state }) => {
  const badgeColor = state ? 'success' : 'danger';

  return (
    <>
      <td>{name} {surname}</td>
      <td>{dpi}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{age}</td>
      <td>{description}</td>
      <td>{skills}</td>
      <td>
        <span className={`badge bg-${badgeColor}`}>
          {state ? 'Activo' : 'Cancelado'}
        </span>
      </td>
    </>
  );
};