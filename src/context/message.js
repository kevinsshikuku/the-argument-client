import React, {createContext, useReducer, useContext} from 'react'

//Two context one holding state other holding dispatch
//Auth state context
const MessageStateContext = createContext();

//Dispatch state context
const MessageDispatchContext = createContext();




//Message reducer
const messageReducer = (state, action) =>{
   switch(action.type){

       case "SET_GROUP_MESSAGES":
         localStorage.setItem("messages", JSON.stringify(action.payload))
        return {
         ...state,
         messages:  action.payload
        }

       case "ADD_MESSAGE":

        const  { messages } = state;
        let newMessages = [
          action.payload, ...messages
        ]
        return {
         ...state,
         messages:  newMessages
        }

      case "SET_GROUPS":
       return{
        ...state,
        groups:  action.payload
       }

      default:
       throw new Error(`unknown action type ${action.type}`)
   }
}

//Provider that will export and use in the App.js
export const MessageProvider = ({children}) => {
  const [state, dispatch] = useReducer(messageReducer, { messages: null   })
   return(
    <MessageDispatchContext.Provider value={dispatch}>
        <MessageStateContext.Provider value ={state}>
                   {children}
        </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
   )
}


//Export what is held inside usecontext
export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
