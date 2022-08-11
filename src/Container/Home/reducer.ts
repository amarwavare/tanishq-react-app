import { createSlice } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
    name: 'homeReducer',
    initialState:{
        open: false
    },
    reducers:{
        displayDialogFormAction : (state:any, action:any) => {
            state.open = action.payload.toDisplay
        }
    }
})

export const {displayDialogFormAction} = HomeSlice.actions;

export default HomeSlice;