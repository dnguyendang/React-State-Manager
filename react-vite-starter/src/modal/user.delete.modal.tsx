import { Button, Modal } from "react-bootstrap";


const UserDeleteModal = (props: any) => {
    const { isOpenDeleteModal, setIsOpenDeleteModal, dataUser } = props;

    const handleSubmit = () => {
        console.log(">>> check delete: ", { id: dataUser?.id ?? "" })
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