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

        },
        startupdate:(state)=>{
            state.load=true
        },
        updatesuccess:(state,action)=>{
            state.load=false
            state.currentuser=action.payload
            state.error=null
        },
        updatefailure:(state,action)=>{
            state.load=false
            state.error=action.payload
        },
        deletestart:(state)=>{
            state.load=true
       },
       deletesuccess:(state,action)=>{
        state.load=false
        state.currentuser=null
        state.error=null
       },
       deletefailure:(state,action)=>{
        state.error=action.payload
        state.load=false
       }
    }
})


export const {signfailue,signsuccess,startsign,startupdate,updatefailure,updatesuccess,deletestart,deletesuccess,deletefailure}=userSlice.actions
export default userSlice.reducer
