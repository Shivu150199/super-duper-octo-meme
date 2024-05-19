import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";


const initialState={
    loading:false,
    user:null,
    error:null,
    profileData:{}

}

export const createSignup=createAsyncThunk('posts/createSignup',async(postData,{rejectWithValue})=>{
    try{
const res=await axios.post('http://localhost:3000/api/auth/v1/signup',postData)
console.log(res.data)
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
console.log(res.data.data.user)
return res.data.data.user


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
return res.data.data


    }catch(error){
return thunkApi.rejectWithValue(error)
    }
})

export const updateUser=createAsyncThunk('patch/updateUser',async(data,{rejectWithValue})=>{
  
try{
const updatedUser = await axios.patch(
  `http://localhost:3000/api/auth/v1/update/${data.uid}`,data.formData
)
console.log(updatedUser.data.data.user)
return updatedUser.data.data.user
}catch(error){
  return rejectWithValue(error)
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

        },
        handleUpdate:(state,action)=>{
          state.profileData=action.payload
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
          }).addCase(updateUser.pending,(state)=>{
            state.loading=true
          }).addCase(updateUser.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false
          }).addCase(updateUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
          })
    }
})

export const {handleData,clearData,handleUpdate}=userSlice.actions

export default userSlice.reducer