import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetUpdate, updateBlog } from "../redux/blog/blog.slide";
import { toast } from "react-toastify";


const BlogEditModal = (props: any) => {

    const dispatch = useAppDispatch();

    const isUpdateSuccess = useAppSelector(state => state.blog.isUpdateSuccess);

    const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;

    const [id, setId] = useState();

    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [content, setContent] = useState<string>("")

    useEffect(() => {
        if (dataBlog?.id) {
            setId(dataBlog?.id);
            setTitle(dataBlog?.title);
            setAuthor(dataBlog?.author);
            setContent(dataBlog?.content);
        }
    }, [dataBlog])

    useEffect(() => {
        if (isUpdateSuccess === true) {
            setIsOpenUpdateModal(false);
            setTitle("");
            setAuthor("");
            setContent("");
            toast.success("Update blog success!");
            // reset redux
            dispatch(resetUpdate());
        }
    }, [isUpdateSuccess])

    const handleSubmit = () => {
        if (!title) {
            alert("title empty");
            return;
        }
        if (!author) {
            alert("author empty");
            return;
        }

        dispatch(updateBlog({ id, title, author, content }));
    }

    return (
        <Modal
            show={isOpenUpdateModal}
            onHide={() => setIsOpenUpdateModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update A Blog</Modal.Title>
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
                    variant='warning'
                    onClick={() => setIsOpenUpdateModal(false)} className='mr-2'>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Confirm</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default BlogEditModal;