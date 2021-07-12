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
  larger: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: "3px solid blue"
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
                     <hr/>
                     <div  className="msg">
                           <div className="avartor">
                                    <Avatar src={message?.sender?.image || Teams.PL}
                                                className={
                                                   (message?.sender?.username || message?.sender ) === user?.username ? classes.larger : classes.large} />
                           </div>
                           <div className="messageBody">
                                    <div  className="messageAction">
                                          <p>{`${message?.sender?.username || message?.sender} fan`}</p>
                                    </div>
                                     <div className="messageText">
                                           <p> {message?.body}</p>
                                       </div>
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


// {
//                                     (message?.sender?.username || message?.sender ) === user?.username
//                                           ? "authmsgbody" : `msgbody`}

 return (
    <div className="homeWrapper">
       {markUp}
    </div>
 )

}

export default Home;
