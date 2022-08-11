import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "../Container/Home/reducer";


export default configureStore({
    reducer:{
        homeReducer: HomeSlice.reducer
    }
})
