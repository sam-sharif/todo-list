import * as actionType from './actionTypes'

const initialState = {
    username:null,
    password:null,
    token:null,
    userAuthenticated: false,
    signupDone:false
}
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            
            return {
                username: action.username,
                token: action.token,
                userAuthenticated: true
                
            }
        case actionType.LOGOUT:
            
            return {
                username: null,
                password: null,
                token: null,
                userAuthenticated: false
                    
            } 
        case actionType.SIGNUP_SUCCESSFUL:
            
        return {
            ...state,
            signupDone:true
                    
        }    
        case actionType.SIGNUP_OFF:
            
            return {
                ...state,
                signupDone:false
                        
            } 
    }
    return state;

}
export default reducer;