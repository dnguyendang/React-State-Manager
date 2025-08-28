import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListBlogs = createAsyncThunk(
    'blogs/fetchListBlogs',
    async () => {
        const res = await fetch("http://localhost:8000/blogs");
        const data = await res.json();
        return data;
    }
)

interface IBlogPayload {
    id?: number;
    title?: string;
    author?: string;
    content?: string;
}
export const createNewBlog = createAsyncThunk(
    'blogs/createNewBlog',
    async (payload: IBlogPayload, thunkAPI) => {
        const res = await fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload })
        });
        const data = await res.json();
        if (data && data.id) {
            // create success => dispatch action fetch list blogs
            thunkAPI.dispatch(fetchListBlogs());
        }

        return data;
    }
)

export const deleteBlog = createAsyncThunk(
    'blogs/deleteBLog',
    async (payload: IBlogPayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        // delete success => dispatch action fetch list blogs
        thunkAPI.dispatch(fetchListBlogs());


        return data;
    }
)

export const updateBlog = createAsyncThunk(
    'blogs/updateBlog',
    async (payload: IBlogPayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: payload.title,
                author: payload.author,
                content: payload.content
            })
        });
        const data = await res.json();
        console.log(">>> check update blog redux: ", data)
        if (data && data.id) {
            // update success => dispatch action fetch list blogs
            thunkAPI.dispatch(fetchListBlogs());
        }

        return data;
    }
)

interface IBlog {
    id: number;
    title: string;
    author: string;
    content: string;
}

const initialState: {
    listBlogs: IBlog[],
    isCreateSuccess: boolean,
    isDeleteSuccess: boolean,
    isUpdateSuccess: boolean,
} = {
    listBlogs: [],
    isCreateSuccess: false,
    isDeleteSuccess: false,
    isUpdateSuccess: false,

}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false;
        },
        resetDelete(state) {
            state.isDeleteSuccess = false;
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
            state.listBlogs = action.payload;
        })
        builder.addCase(createNewBlog.fulfilled, (state, action) => {
            state.isCreateSuccess = true;
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.isDeleteSuccess = true;
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.isUpdateSuccess = true;
        })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetDelete, resetUpdate } = blogSlice.actions

export default blogSlice.reducer
