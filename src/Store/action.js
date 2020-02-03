import * as actionType from './actionTypes'
export const  authSuccess = (user,token)=>{
    return{
        type: actionType.LOGIN_SUCCESS,
        username: user,
        token: token
    }

}
export const  logout = ()=>{
    return{
        type: actionType.LOGOUT
    }

}
export const  signupSucceeded = ()=>{
    return{
        type: actionType.SIGNUP_SUCCESSFUL
    }

}
export const  signupDoneOff = ()=>{
    return{
        type: actionType.SIGNUP_OFF
    }

}