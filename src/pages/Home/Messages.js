import React, {useEffect}  from 'react';
import { useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

import  { Avatar} from "@material-ui/core";
import { GET_GROUP_MESSAGES } from '../../Graphql/message';
import {  useMessageDispatch } from '../../context/message';
import { Teams }  from "../../Assets/logos";
import  Msgs from "./index"
import "./home.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

/** Home component */
const  Home = () => {
   const dispatch = useMessageDispatch();
   const classes = useStyles();

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_GROUP_MESSAGES,{fetchPolicy:"no-cache"})
  useEffect(() => {
      getMessages({ variables: { receiver: "EPL", limit:300 } })
  }, [getMessages])


  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: 'SET_GROUP_MESSAGES',
        payload: messagesData.getGroupMessages.messages
      })
    }
  }, [messagesData, dispatch])

let  placeHolder;
if(messagesLoading){
   return placeHolder = (
      <div className="loadingState">
           <Avatar src={Teams.EPL} className={classes.large} />
      </div>

   )
}


if(!messagesData){
   return placeHolder = (
      <div className="loadingState">
           <h1>No arguments</h1>
      </div>
   )
}


 return (
    <div className="homeWrapper">
       {placeHolder}
       <Msgs/>
    </div>
 )

}

export default Home;
