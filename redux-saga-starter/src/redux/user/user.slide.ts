import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"

export interface UserState {
    isPending: boolean
    isError: boolean
    data: []
    errors: []
}

const initialState: UserState = {
    isPending: false,
    isError: false,
    data: [],
    errors: [],
}

export const fetchUserPending = createAction("fetchUserPending")
export const fetchUserSuccess = createAction<{ value: number }>("fetchUserSuccess")
export const fetchUserFailed = createAction<{ value: number }>("fetchUserFailed")


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPending, (state, action) => {
                state.isPending = true;
                state.isError = false;
            })
            .addCase(fetchUserSuccess, (state, action) => {

            })
            .addCase(fetchUserFailed, (state, action) => {

            })

    },
})

export const { } = userSlice.actions



export default userSlice.reducer
