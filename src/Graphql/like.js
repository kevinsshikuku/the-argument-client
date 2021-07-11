 import  { gql } from '@apollo/client';


/**Create like */
export const CREATE_LIKE = gql`
  mutation($messageId: String! ){
     createLike( messageId: $messageId ){
      id
      message
      createdAt
     }
  }
`

/** Publishes new like in real time */
export const NEW_LIKE = gql`
  subscription {
     like{
        id
        message
        createdAt
     }
  }
`