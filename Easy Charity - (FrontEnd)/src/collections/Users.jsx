export const Users = ({ name, surname, username, email, phone, role}) => {
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{role}</td>
        </>
    );
};