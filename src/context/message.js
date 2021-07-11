import React, {createContext, useReducer, useContext} from 'react'

//Two context one holding state other holding dispatch
//Auth state context
const MessageStateContext = createContext();

//Dispatch state context
const MessageDispatchContext = createContext();




//Message reducer
const messageReducer = (state, action) =>{
   const { messages } = state
   switch(action.type){

       case "SET_GROUP_MESSAGES":
         localStorage.setItem("messages", JSON.stringify(action.payload))
        return {
         ...state,
         messages:  action.payload
        }

       case "ADD_MESSAGE":
        let newMessages = [
          action.payload, ...messages
        ]
        return {
         ...state,
         messages:  newMessages
        }


    case "ADD_LIKE_TO_MSG":
       let { message:msg} = action.payload;

      let _message =   messages.find( message => message.id === msg )

      let newLikes =[ ..._message.likes,  action.payload]

      _message.likes = newLikes
      return{
        ...state
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
