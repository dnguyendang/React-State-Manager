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
    name: string;
    email: string;
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


interface IUser {
    id: number;
    name: string;
    email: string;
}

const initialState: { listUsers: IUser[] } = {
    listUsers: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            state.listUsers = action.payload;
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer
