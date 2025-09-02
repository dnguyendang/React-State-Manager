import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"

export interface CounterState {
    value: number
    status: "idle" | "loading" | "failed"
}

const initialState: CounterState = {
    value: 0,
    status: "idle",
}

export const increaseSagaFinish = createAction<{ value: number }>("increaseSagaFinish")
export const decreaseSagaFinish = createAction<{ value: number }>("decreaseSagaFinish")
export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },

        increaseSagaStart: (state) => {
            state.status = "loading"
        },

        decreaseSagaStart: (state) => {
            state.status = "loading"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(increaseSagaFinish, (state, action) => {
                state.status = "idle";
                state.value += action.payload.value;
            })
            .addCase(decreaseSagaFinish, (state, action) => {
                state.status = "idle";
                state.value -= action.payload.value;
            })
    },
})

export const { increment, decrement,
    incrementByAmount,
    increaseSagaStart, decreaseSagaStart
} = counterSlice.actions



export default counterSlice.reducer
