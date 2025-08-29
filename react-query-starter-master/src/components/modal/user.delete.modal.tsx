import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { QUERY_KEY } from '../config/queryKey';

const UserDeleteModal = (props: any) => {
    const queryClient = useQueryClient();

    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

    const handleSubmit = () => {
        mutation.mutate(dataUser?.id);
    }

    const mutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`http://localhost:8000/users/${id}`, {
                method: 'DELETE',
            });
            return res.json();
        },
        onSuccess: () => {
            alert("User deleted successfully");
            setIsOpenDeleteModal(false);
            // queryClient.invalidateQueries({ queryKey: ['fetchUsers'] });
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllUser() });
        },
        onError: () => {
            alert("Error deleting user");
        }
    })

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
            <Modal.Footer>
                {!mutation.isPending ?
                    <>
                        <Button
                            variant='warning'
                            onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Confirm</Button>
                    </>
                    :
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <> </>Deleting...
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default UserDeleteModal;