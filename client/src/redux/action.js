import axios from 'axios'

const SIGN_IN_SUCCESS="SIGN_IN_SUCCESS"
export const SIGN_UP_SUCCESS="SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE="SIGN_UP_FAILURE"

export const signup=(userdata)=>{
return async(dispatch)=>{
    try {
      let res = await axios.post(
        'http://localhost:3000/api/auth/v1/signup',
        userdata
      )

      dispatch({type:SIGN_UP_SUCCESS,payload:res.data})
      if (!res.data.status == 'success') {
      
        return
      }
    
    } catch (err) {
  dispatch({
    type: SIGN_UP_FAILURE,
    payload: err, // Assuming error response contains error message
  })
    }

}
}

