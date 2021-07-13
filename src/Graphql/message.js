 import  { gql } from '@apollo/client';

 const messagePayload = `
    id
   body
   sender
   receiver
   createdAt
 `


 /**Get message by ID */
  export const GET_MESSAGE = gql`
      query($id: ID){
       getMessage(id: $id){
          ${messagePayload}
       }
      }
  `;


/** Fetches all group messages */
  export const GET_GROUP_MESSAGES = gql`
     query($receiver: String!, $limit: Int, $end: String){
      getGroupMessages(receiver: $receiver, limit: $limit, end: $end){
         cursor,
         count,
         hasmore
         messages{
                id
                body
                sender{
                  id
                  username
                  image
                }
                likes{
                   id
                   message
                   createdAt
                }
                createdAt
         }
      }
     }
  `;


/**Create message */


/** Publishes new message in real time */
export const NEW_MESSAGE = gql`
  subscription {
     message{
        id,
        body,
        sender{
           id
           image
           username
        },
        likes{
           id
           message
        }
        createdAt
     }
  }
`
// const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']

export const CREATE_MESSAGE = gql`
  mutation($body: String!, $receiver: String){
     sendMessage(body: $body, receiver:$receiver){
      id
      body
      sender{
          id
          username
      },
      likes{
         id
         message
      }
      createdAt
  }
}
`