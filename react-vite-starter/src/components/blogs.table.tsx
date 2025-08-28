import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchListBlogs } from "../redux/blog/blog.slide";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import BlogCreateModal from "../modal/blog.create.modal";
import BlogDeleteModal from "../modal/blog.delete.modal";
import BlogEditModal from "../modal/blog.edit.modal";

const BlogsTable = () => {

    const dispatch = useAppDispatch();
    const blogs = useAppSelector(state => state.blog.listBlogs);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

    const [dataBlog, setDataBlog] = useState({});

    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchListBlogs());
        // toast("Fetch blogs successfully!")
    }, [])

    const handleEditBlog = (blog: any) => {
        setIsOpenUpdateModal(true)
        setDataBlog(blog)
    }

    const handleDeleteBlog = (blog: any) => {
        setIsOpenDeleteModal(true)
        setDataBlog(blog)
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center my-3">
                <h4>Table Blogs</h4>
                <Button variant="primary"
                    onClick={() => setIsOpenCreateModal(true)}
                >Add New</Button>
            </div>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map(blog => {
                        return (
                            <tr key={blog.id}>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>{blog.content}</td>
                                <td className="d-flex">
                                    <Button variant="warning"
                                        onClick={() => { handleEditBlog(blog) }}
                                    >
                                        Edit
                                    </Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="danger"
                                        onClick={() => { handleDeleteBlog(blog) }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <BlogCreateModal
                isOpenCreateModal={isOpenCreateModal}
                setIsOpenCreateModal={setIsOpenCreateModal}
            />

            <BlogEditModal
                isOpenUpdateModal={isOpenUpdateModal}
                setIsOpenUpdateModal={setIsOpenUpdateModal}
                dataBlog={dataBlog}
            />

            <BlogDeleteModal
                isOpenDeleteModal={isOpenDeleteModal}
                setIsOpenDeleteModal={setIsOpenDeleteModal}
                dataBlog={dataBlog}
            />
        </>
    );
}

export default BlogsTable;