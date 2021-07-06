import React,{useEffect} from 'react';
import { useSubscription } from '@apollo/client'
import { NEW_MESSAGE } from '../../Graphql/message';
import { useMessageDispatch } from '../../context/message';

import Messages from './Messages'

function Home() {
const messageDispatch = useMessageDispatch();

  const { data: messageData, error: messageError } = useSubscription( NEW_MESSAGE )


  useEffect(() => {
    if (messageError) console.log(messageError)

    if (messageData) {
      messageDispatch({
        type: 'ADD_MESSAGE',
        payload: messageData.message
      })
    }
  }, [messageError, messageData, messageDispatch])


   return (
      <div>
          <Messages/>
      </div>
   )
}

export default Home
