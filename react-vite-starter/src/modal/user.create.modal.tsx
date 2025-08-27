import { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { createNewUser } from "../redux/user/user.slide";


const UserCreateModal = (props: any) => {
    const dispatch = useAppDispatch();

    const { isOpenCreateModal, setIsOpenCreateModal } = props;

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = () => {
        if (!email) {
            alert("email empty");
            return;
        }
        if (!name) {
            alert("name empty");
            return;
        }

        // call api => call redux
        console.log(">>> check create: ", { email, name })
        dispatch(createNewUser({ email, name }));
        setIsOpenCreateModal(false);
        setEmail("");
        setName("");
    }

    return (
        <Modal
            show={isOpenCreateModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => setIsOpenCreateModal(false)}
            backdrop={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add A New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                    />
                </FloatingLabel>
                <FloatingLabel label="Name">
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="mr-2"
                    variant='warning'
                    onClick={() => setIsOpenCreateModal(false)}
                >Cancel</Button>
                <Button
                    onClick={() => handleSubmit()}
                >Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default UserCreateModal;