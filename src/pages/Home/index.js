import React from 'react';
import  { Avatar} from "@material-ui/core";
import {Teams} from "../../Assets/logos";

import {currentDate} from "../../Utils/date";
import { useAuthState } from '../../context/auth';
import { useMessageState } from '../../context/message';
import "./home.css";




/** Home component */
const  Home = () => {
   const  { user } = useAuthState();
   const { messages } = useMessageState();
// const msgs = JSON.parse(localStorage.getItem("messages"));


let markUp  = messages &&  messages.map(
          (message) => (
                  <div  key={message?.id}>
                     <div  className={message?.sender?.username === user?.username ? "authmsg" : `msg`}>
                           <div className="messageSender">
                                    <Avatar src={message?.sender?.image || Teams.EPL}  sizes="1em"/>
                                    <p>{message?.sender?.username || message?.sender}</p>
                           </div>
                           <div className={
                              (message?.sender?.username || message?.sender ) === user?.username
                                          ? "authmsgbody" : `msgbody`}>
                                    {message?.body}
                                    <div className="messageMeta">{currentDate(message?.createdAt)}</div>
                               </div>
                     </div>
                  </div>
          )
)

 return (
    <div className="homeWrapper">
       {markUp}
    </div>
 )

}

export default Home;
