import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { toast } from 'react-toastify'

const initialState = {
  loading: false,
  formData: null,
  joblist: null,
  error: null,
singleJobState:null
}

export const createJob = createAsyncThunk(
  'posts/createJob',
  async (jobData, thunkApi) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/job/v1/addjob',
        jobData
      )
      return res.data
    } catch (err) {
      return thunkApi.rejectWithValue(err)
    }
  }
)
export const allJob = createAsyncThunk('get/allJob', async (_, thunkApi) => {
  try {
    const res = await axios.get('http://localhost:3000/api/job/v1/alljobs')
    return res.data
  } catch (err) {
    return thunkApi.rejectWithValue(err)
  }
})
export const deleteJob = createAsyncThunk(
  'delete/deleteJob',
  async (id, { rejectWithValue }) => {
    try {
      let deleted = await axios.delete(
        `http://localhost:3000/api/job/v1/alljobs/${id}`
      )
      console.log(deleted.data.data)
      return id
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const getSingleJob = createAsyncThunk(
  'get/getSingleJob',
  async (id, { rejectWithValue }) => {
    try {
      let jobs = await axios.get(
        `http://localhost:3000/api/job/v1/alljobs/${id}`
      )
      return jobs.data.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const editJob = createAsyncThunk(
  'patch/editJob',
  async (id, { rejectWithValue }) => {
   
    try {
      let jobs = await axios.patch(
        `http://localhost:3000/api/job/v1/editjobs/${id.id}`,id.editData
      )
      console.log(id)
      console.log(id.editData)
   console.log(jobs.data)
      return jobs.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleJob: (state, action) => {
      state.formData = action.payload
    },
  // handleEditJob: (state, action) => {
  //   state.singleJobState=action.payload
  // }
    
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createJob.fulfilled, (state, action) => {
      console.log(action)
        state.formData = action.payload.data
      state.loading = false
      toast('Job Created')
   
    })
    builder.addCase(createJob.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      toast('failed to create job')
    })
    builder.addCase(allJob.pending, (state) => {
      state.loading = true
    })
    builder.addCase(allJob.fulfilled, (state, action) => {
      state.loading = false
      state.joblist = action.payload
    })
    builder
      .addCase(allJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteJob.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false
        state.joblist.data = state.joblist.data.filter(
          (item) => item._id !== action.payload
        )
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getSingleJob.pending, (state) => {
        state.loading = true
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        state.loading = false
    
        state.singleJobState =action.payload
      })
      .addCase(getSingleJob.rejected, (state,action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(editJob.pending, (state) => {
        state.loading = true
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false
       
      })
      .addCase(editJob.rejected, (state,action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { handleJob,handleEditJob } = jobSlice.actions
export default jobSlice.reducer
