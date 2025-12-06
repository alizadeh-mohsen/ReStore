import { createSlice } from "@reduxjs/toolkit";
import { title } from "process";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 0,
    title: ""
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state, action) => {
            state.title = 'incremented by ' + action.payload;
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.title = 'decremented by ' + action.payload;
            state.data -= action.payload
        }
    }
})
export const { increment, decrement } = counterSlice.actions;