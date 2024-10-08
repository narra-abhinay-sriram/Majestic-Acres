import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        currentuser:null,
        load:false,
        error:null
    },
    reducers:{
        startsign:(state,action)=>{
            state.load=true
        },
        signsuccess:(state,action)=>{
        //    console.log(action.payload)
            state.currentuser=action.payload,
            state.load=false
            state.error=null
        },
        signfailue:(state,action)=>{

            state.load=false,
            state.error=action.payload

        }
    }
})


export const {signfailue,signsuccess,startsign}=userSlice.actions
export default userSlice.reducer
