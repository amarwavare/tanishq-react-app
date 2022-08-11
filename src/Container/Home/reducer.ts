import { createSlice } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
    name: 'homeReducer',
    initialState:{
        openInputDialog: false,
        userData: [],
        selectedUserId: null,
        userDataDialog: false,
    },
    reducers:{
        displayDialogFormAction : (state:any, action:any) => {
            state.openInputDialog = action.payload.toDisplay;
        },
        setDataAction : (state:any, action:any) => {
            state.userData = action.payload.userData;
        },
        getIdAction : (state:any, action:any) => {
            state.selectedUserId = action.payload.id;
        },
        displayUserDataDialogAction : (state:any, action:any) => {
            state.userDataDialog = action.payload.toDisplay
        }
    }
})

export const {
    displayDialogFormAction,
    setDataAction,
    getIdAction,
    displayUserDataDialogAction,
} = HomeSlice.actions;

export default HomeSlice;