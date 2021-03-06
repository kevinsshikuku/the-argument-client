import React,{useEffect} from 'react';
import { useSubscription } from '@apollo/client'
import { NEW_MESSAGE } from '../../Graphql/message';
import { NEW_LIKE } from "../../Graphql/like"
import { useMessageDispatch } from '../../context/message';

import Messages from './Messages'

function Home() {
const messageDispatch = useMessageDispatch();

  const { data: messageData, error: messageError } = useSubscription( NEW_MESSAGE )

  const { data: likeData, error: likeError } = useSubscription( NEW_LIKE )


  useEffect(() => {
    if (messageError) console.log(messageError)

    if (messageData) {
      messageDispatch({
        type: 'ADD_MESSAGE',
        payload: messageData.message
      })
    }
  }, [messageError, messageData, messageDispatch])



useEffect( () =>{
    if (likeData) {
      messageDispatch({
        type: 'ADD_LIKE_TO_MSG',
        payload: likeData.like
      })
    }
  }, [likeError, likeData, messageDispatch])


   return (
      <div>
          <Messages/>
      </div>
   )
}

export default Home
