import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchListUsers } from "../redux/user/user.slide";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import UserCreateModal from "../modal/user.create.modal";
import UserDeleteModal from "../modal/user.delete.modal";
import UserEditModal from "../modal/user.edit.modal";

const UsersTable = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.user.listUsers);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

    const [dataUser, setDataUser] = useState({});

    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchListUsers());
        // toast("Fetch users successfully!")
    }, [])

    const handleEditUser = (user: any) => {
        setIsOpenUpdateModal(true)
        setDataUser(user)
    }

    const handleDeleteUser = (user: any) => {
        setIsOpenDeleteModal(true)
        setDataUser(user)
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center my-3">
                <h4>Table Users</h4>
                <Button variant="primary"
                    onClick={() => setIsOpenCreateModal(true)}
                >Add New</Button>
            </div>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button variant="warning"
                                        onClick={() => { handleEditUser(user) }}
                                    >
                                        Edit
                                    </Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="danger"
                                        onClick={() => { handleDeleteUser(user) }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <UserCreateModal
                isOpenCreateModal={isOpenCreateModal}
                setIsOpenCreateModal={setIsOpenCreateModal}
            />

            <UserEditModal
                isOpenUpdateModal={isOpenUpdateModal}
                setIsOpenUpdateModal={setIsOpenUpdateModal}
                dataUser={dataUser}
            />

            <UserDeleteModal
                isOpenDeleteModal={isOpenDeleteModal}
                setIsOpenDeleteModal={setIsOpenDeleteModal}
                dataUser={dataUser}
            />
        </>
    );
}

export default UsersTable;