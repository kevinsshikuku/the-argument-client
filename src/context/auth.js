import jwtDecode from 'jwt-decode';
import React, {createContext, useReducer, useContext} from 'react'

//Two context one holding state other holding dispatch
//Auth state context
const AuthStateContext = createContext();

//Dispatch state context
const AuthDispatchContext = createContext();


let user
const token =localStorage.getItem("jwt");
if(token){
 const decodedToken = jwtDecode(token)
 const expiresAt = new Date(decodedToken.exp * 10000)

 if(new Date() > expiresAt){
     localStorage.removeItem("jwt")
 } else{
  user = decodedToken
 }
}


//Auth reducer
const authReducer = (state, action) =>{
 localStorage.setItem("jwt", action.token)
   switch(action.type){
    case 'LOGIN' :
      return {
        ...state,
        user: action.payload
      }

      case 'LOGOUT' :
       localStorage.removeItem("jwt")
      return {
       ...state,
       user: ""
      }

      default:
       throw new Error(`unknown action type ${action.type}`)
   }
}

//Provider that will export and use in the App.js
export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, { user })
   return(
    <AuthDispatchContext.Provider value={dispatch}>
        <AuthStateContext.Provider value ={state}>
                   {children}
        </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
   )
}


//Export uwhat is held inside usecontext
export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
