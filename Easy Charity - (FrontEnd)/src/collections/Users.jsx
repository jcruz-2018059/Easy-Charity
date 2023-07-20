export const Users = ({ name, surname, username, email, phone, role}) => {
    const roleClass = role === 'ADMIN' ? 'badge text-bg-success' : role === 'ORGANIZATION ADMIN' ? 'badge text-bg-danger' : 'badge text-bg-primary';
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                {
                    role === 'ADMIN' ? (
                        <span className={roleClass}>Administrador</span>
                    ) : role === 'ORGANIZATION ADMIN' ? (
                        <span className={roleClass}>Admin. Organización</span>
                    ) : <span className={roleClass}>Cliente</span>
                }
                
            </td>
        </>
    );
};