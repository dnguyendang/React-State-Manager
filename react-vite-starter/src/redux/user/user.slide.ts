import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListUsers = createAsyncThunk(
    'users/fetchListUsers',
    async () => {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        return data;
    }
)

interface IUserPayload {
    id?: number;
    name?: string;
    email?: string;
}
export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload: IUserPayload, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload })
        });
        const data = await res.json();
        if (data && data.id) {
            // create success => dispatch action fetch list users
            thunkAPI.dispatch(fetchListUsers());
        }

        return data;
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload: IUserPayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        // delete success => dispatch action fetch list users
        thunkAPI.dispatch(fetchListUsers());


        return data;
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload: IUserPayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: payload.email,
                name: payload.name
            })
        });
        const data = await res.json();
        console.log(">>> check update user redux: ", data)
        if (data && data.id) {
            // update success => dispatch action fetch list users
            thunkAPI.dispatch(fetchListUsers());
        }

        return data;
    }
)

interface IUser {
    id: number;
    name: string;
    email: string;
}

const initialState: {
    listUsers: IUser[],
    isCreateSuccess: boolean,
    isDeleteSuccess: boolean,
    isUpdateSuccess: boolean,
} = {
    listUsers: [],
    isCreateSuccess: false,
    isDeleteSuccess: false,
    isUpdateSuccess: false,

}

export const userSlice = createSlice({
    name: 'user',
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
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            state.listUsers = action.payload;
        })
        builder.addCase(createNewUser.fulfilled, (state, action) => {
            state.isCreateSuccess = true;
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isDeleteSuccess = true;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isUpdateSuccess = true;
        })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetDelete, resetUpdate } = userSlice.actions

export default userSlice.reducer
