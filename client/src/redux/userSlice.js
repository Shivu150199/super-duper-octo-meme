import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";


const initialState={
    loading:false,
    user:null,
    error:null,

}

export const createSignup=createAsyncThunk('posts/createSignup',async(postData,{rejectWithValue})=>{
    try{
const res=await axios.post('http://localhost:3000/api/auth/v1/signup',postData)
return res.data
    }catch(err){
        console.log(err)
return rejectWithValue(err)
    }
})


export const createLogin=createAsyncThunk('posts/createLogin',async(userData,thunkApi)=>{
    try{
const res = await axios.post(
  'http://localhost:3000/api/auth/v1/login',
  userData
)
return res.data


    }catch(error){
return thunkApi.rejectWithValue(error)
    }
})
export const googleAuthentication=createAsyncThunk('posts/googleAuthentication',async(userData,thunkApi)=>{
    try{
const res = await axios.post(
  'http://localhost:3000/api/auth/v1/googleAuth',
  userData
)
return res.data


    }catch(error){
return thunkApi.rejectWithValue(error)
    }
})


export const navigateToLogin = () => {
  return (dispatch) => {
    dispatch(navigate('/login'))
  }
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        handleData:(state,action)=>{
            state.user=action.payload
           
        },
        clearData:(state)=>{
            state.user=null

        }
    
    },
    extraReducers:(builder)=>{
        builder
          .addCase(createSignup.pending, (state) => {
            state.loading = true
          })
          .addCase(createSignup.fulfilled, (state, action) => {
            state.status = 'succeded', 
            state.user = action.payload,
            state.loading = false
            toast('sign up successfull')
          })
          .addCase(createSignup.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            state.loading = false
          })
          .addCase(createLogin.pending, (state) => {
            state.loading = true
          })
          .addCase(createLogin.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
          })
          .addCase(createLogin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
          })
          .addCase(googleAuthentication.pending, (state) => {
            state.loading = true
          })
          .addCase(googleAuthentication.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
            toast('sign up successfull')
          })
          .addCase(googleAuthentication.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
          })
    }
})

export const {handleData,clearData}=userSlice.actions

export default userSlice.reducer