export const QUERY_KEY = {
    getUserPaginate: (page: number) => { return ["fetchUsers", page] },
    getAllUser: () => { return ["fetchUsers"] },
    getUserDetail: (id: number) => { return ["fetchUser", id] },
    getCountUser: () => { return ["fetchCount"] },

    getBlogPaginate: (page: number) => { return ["fetchBlogs", page] },
    getAllBlog: () => { return ["fetchBlogs"] },
    getBlogDetail: (id: number) => { return ["fetchBlog", id] },
}