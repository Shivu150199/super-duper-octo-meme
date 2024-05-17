import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const initialState={
    loading:false,
    formData:null,
    joblist:[],
    error:null
}

export const createJob=createAsyncThunk('posts/createJob',async(jobData,thunkApi)=>{
try{
const res = await axios.post(
  'http://localhost:3000/api/job/v1/addjob',
  jobData
)
return res.data


}catch(err){
    return thunkApi.rejectWithValue(err)
}
})
export const allJob=createAsyncThunk('get/allJob',async(_,thunkApi)=>{
try{
const res = await axios.get(
  'http://localhost:3000/api/job/v1/alljobs'
)
return res.data


}catch(err){
    return thunkApi.rejectWithValue(err)
}
})


const jobSlice=createSlice({
    name:'job',
    initialState,
    reducers:{
handleJob:(state,action)=>{
state.formData=action.payload
}
    },extraReducers:(builder)=>{
        builder.addCase(createJob.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(createJob.fulfilled,(state,action)=>{
            state.loading=false
            state.formData=action.payload
            toast('Job Created')
        })
        builder.addCase(createJob.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
             toast('failed to create job')
        })
        builder.addCase(allJob.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(allJob.fulfilled,(state,action)=>{
            state.loading=false
            state.joblist=action.payload
           
        })
        builder.addCase(allJob.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
          
        })
    }

})

export const {handleJob} =jobSlice.actions
export default jobSlice.reducer
