import React, {createContext, useReducer, useContext} from 'react'

//Two context one holding state other holding dispatch
//Auth state context
const GroupStateContext = createContext();

//Dispatch state context
const GroupDispatchContext = createContext();




//Group reducer
const groupReducer = (state, action) =>{
   switch(action.type){

      case "SET_GROUP":
       console.log(action.payload)
       return{
        ...state,
        groups:  action.payload
       }

      default:
       throw new Error(`unknown action type ${action.type}`)
   }
}

//Provider that will export and use in the App.js
export const GroupProvider = ({children}) => {
  const [state, groupDispatch] = useReducer(groupReducer, { Groups: null   })
   return(
    <GroupDispatchContext.Provider value={groupDispatch}>
        <GroupStateContext.Provider value ={state}>
                   {children}
        </GroupStateContext.Provider>
    </GroupDispatchContext.Provider>
   )
}


//Export what is held inside usecontext
export const useGroupState = () => useContext(GroupStateContext);
export const useGroupDispatch = () => useContext(GroupDispatchContext);
