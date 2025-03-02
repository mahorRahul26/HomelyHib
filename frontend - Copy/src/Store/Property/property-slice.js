import {createSlice} from "@reduxjs/toolkit";

const propertySlice = createSlice({

    // Slice name 
    name:"property",
    // intail state fro the property slice


    initialState:{
        properties: [],
        totalProperties: 0,
        searchParams: {},
        error: null,
        laoding:false,
    },

    // reduders function to handle diff fun
    reducers: {
        getRequest(state){
            state.laoding = true;
        },
        // action to update propperties state with fetch data
        getProperties(state,action){
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.laoding = false;
        },
        // action to search parametes
        updateSearchParams:(state, action)=>{
            state.searchParams = Object.keys(action.payload).length === 0 ? {}
            : {
                ...state.searchParams,
                ...action.payload,
             };
        },

        //action to update error state 

        getErrors(state, action){
            state.error = action.payload;
        },
    },
});

export const propertyAction = propertySlice.actions;

export default propertySlice;