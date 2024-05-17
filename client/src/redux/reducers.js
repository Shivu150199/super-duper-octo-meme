import { SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from "./action";



const initialState={
    user:null,
    formData:null,
    loading:false,
    error:null,
    
    isAuthenticated:false,
}

const authReducers=(state=initialState,action)=>{
switch(action.type){

case 'HANDLECHANGE':{
return { ...state, formData: { [action.payload.id]: action.payload.value } }
}
case SIGN_UP_SUCCESS:{
    return {...state,loading:false}
}
case SIGN_UP_FAILURE:{
    return {...state,loading:false}
}

}
// if (action.type == 'HANDLECHANGE'){
// // return state.formData={...formData,[action.payload.id]:action.payload.value}
// return {...state,formData:{[action.payload.id]:action.payload.value}}

// }




    
    
    return state
}

export default authReducers