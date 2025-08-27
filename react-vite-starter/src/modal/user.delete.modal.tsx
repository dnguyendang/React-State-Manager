import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteUser, resetDelete } from "../redux/user/user.slide";
import { useEffect } from "react";
import { toast } from "react-toastify";


const UserDeleteModal = (props: any) => {

    const dispatch = useAppDispatch();

    const { isOpenDeleteModal, setIsOpenDeleteModal, dataUser } = props;

    const isDeleteSuccess = useAppSelector(state => state.user.isDeleteSuccess);

    useEffect(() => {
        if (isDeleteSuccess === true) {
            setIsOpenDeleteModal(false);
            toast.success("Delete user success!");
            // reset redux
            dispatch(resetDelete());
        }
    }, [isDeleteSuccess])

    const handleSubmit = () => {
        dispatch(deleteUser({ id: dataUser.id }));
    }

    return (
        <Modal
            show={isOpenDeleteModal}
            onHide={() => setIsOpenDeleteModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete A User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete the user: {dataUser?.name ?? ""}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='warning'
                    onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Confirm</Button>
            </Modal.Footer>
        </Modal >

    )
}
export default UserDeleteModal;