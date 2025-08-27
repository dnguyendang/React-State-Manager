import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";


interface IUser {
    id: number;
    name: string;
    email: string;
}

const UsersTable = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users?.map(user => {
                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default UsersTable;