import React from 'react';
import  { Avatar} from "@material-ui/core";
import {Teams} from "../../Assets/logos";
import { makeStyles } from '@material-ui/core/styles';

import { timeAgo} from "../../Utils/date";
import { useAuthState } from '../../context/auth';
import { useMessageState } from '../../context/message';
import  LikeButton from "../../Components/Like/like";
import "./home.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));


/** Home component */
const  Home = () => {
   const  { user } = useAuthState();
   const { messages } = useMessageState();
    const classes = useStyles();
// const msgs = JSON.parse(localStorage.getItem("messages"));

// console.log(messages[0])

let markUp  = messages &&  messages?.map(
          (message) => (
                  <div  key={message.id}>
                     <div  className={message?.sender?.username === user?.username ? "authmsg" : `msg`}>
                           <div className="messageSender">
                                    <Avatar src={message?.sender?.image || Teams.PL}   className={classes.large} />
                                    <p>{`${message?.sender?.username || message?.sender} fan`}</p>
                           </div>
                           <div className={
                                    (message?.sender?.username || message?.sender ) === user?.username
                                          ? "authmsgbody" : `msgbody`}>
                                    <p>{message?.body}</p>
                                    <div className="messageMeta">
                                           <div>
                                               <LikeButton messageId={message.id}  likes={message?.likes}/>
                                           </div>
                                            <p> { timeAgo(message?.createdAt)}</p>
                                     </div>
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
