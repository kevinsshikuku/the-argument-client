import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { TextareaAutosize, CircularProgress } from  "@material-ui/core";
import { Close} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

import {CREATE_MESSAGE} from "../../Graphql/message";
import "./addmessage.css";


/** Create a message component */
const  Add_message = () => {
  const history = useHistory();
 const [ body, setBody] = useState("")

 const handleChange = (e) => {
       setBody( e.target.value);
 }


 const [sendMessage, {data, loading}] =  useMutation(CREATE_MESSAGE, {
    variables: {
       body,
       receiver: "EPL"
    }
 })



const  handleSubmit = (e) => {
  e.preventDefault()
  sendMessage();
  history.goBack();
  setBody("");
}


 return (
  <div className="addMessagewrapper">
     <div className="cancel" >
        <Close  onClick={() => history.goBack()} />
     </div>
    <div className="addmessage">
        <form className="messageForm" onSubmit={handleSubmit}>
                    <TextareaAutosize autoFocus value={body} onChange={handleChange}  name="message" className="textarea"/>

                    {!data && loading ?
                      <button className="loadingbutton" ><CircularProgress  size="1rem" color="primary"/></button> :
                      <button type="submit"  disabled={!body || body.trim() === ""} className="messagebutton" >Send </button>}
        </form>
    </div>
  </div>
 )
}

export default Add_message;
