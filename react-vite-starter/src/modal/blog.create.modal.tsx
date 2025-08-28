import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createNewBlog, resetCreate } from "../redux/blog/blog.slide";
import { toast } from "react-toastify";


const BlogCreateModal = (props: any) => {
    const dispatch = useAppDispatch();

    const { isOpenCreateModal, setIsOpenCreateModal } = props;

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const isCreateSuccess = useAppSelector(state => state.blog.isCreateSuccess);

    useEffect(() => {
        if (isCreateSuccess === true) {
            setIsOpenCreateModal(false);
            setTitle("");
            setAuthor("");
            setContent("");
            toast.success("Create blog success!");
            // reset redux
            dispatch(resetCreate());
        }
    }, [isCreateSuccess])

    const handleSubmit = () => {
        if (!title) {
            alert("title empty");
            return;
        }
        if (!author) {
            alert("author empty");
            return;
        }

        // call api => call redux
        dispatch(createNewBlog({ author, title, content }));
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
                <Modal.Title>Add A New Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel label="Title" className="mb-3">
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                    />
                </FloatingLabel>
                <FloatingLabel label="Author" className="mb-3">
                    <Form.Control
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        type="text"
                    />
                </FloatingLabel>
                <FloatingLabel label="Content" className="mb-3">
                    <Form.Control
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        as="textarea"
                        style={{ height: '100px' }}
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

export default BlogCreateModal;