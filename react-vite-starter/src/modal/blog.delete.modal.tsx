import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteBlog, resetDelete } from "../redux/blog/blog.slide";
import { useEffect } from "react";
import { toast } from "react-toastify";


const BlogDeleteModal = (props: any) => {

    const dispatch = useAppDispatch();

    const { isOpenDeleteModal, setIsOpenDeleteModal, dataBlog } = props;

    const isDeleteSuccess = useAppSelector(state => state.blog.isDeleteSuccess);

    useEffect(() => {
        if (isDeleteSuccess === true) {
            setIsOpenDeleteModal(false);
            toast.success("Delete blog success!");
            // reset redux
            dispatch(resetDelete());
        }
    }, [isDeleteSuccess])

    const handleSubmit = () => {
        dispatch(deleteBlog({ id: dataBlog.id }));
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
                <Modal.Title>Delete A Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete the blog: {dataBlog?.title ?? ""}
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
export default BlogDeleteModal;