 import  { gql } from '@apollo/client';



 const userPayload =`
   id
   username
   description
   messages{
        id
        body
        sender
        receiver
        createdAt
   }
    group
    image
    coverImage
`

  const authUserPayload = `
    username
    group
    token
  `

/** Gets a single user */
export const GET_USER = gql`
  query($username: String){
   getUser{
      id
      username
      description
      group
      image
      coverImage
      messages{
            id
            body
            sender{
              id
              username
            }
            createdAt
       }
    }
  }
`
export const GET_GROUPS = gql`
  query{
   getGroups{
      id
      username
      description
      group
      image
      coverImage
      messages{
            id
            body
            sender{
              id
              username
            }
            createdAt
       }
    }
  }
`

/** Gets all vailabe teams  exept logged in team*/
export const GET_USERS = gql`
  query{
   getUsers{
      ${userPayload}
    }
  }
`

/** Get the loged in user team */
export const GET_AUTH_USER = gql`
 query{
   getAuthUser{
     ${userPayload}
   }
 }
`

/** Creates a user acccesible to admins only */
export const SIGN_UP = gql`
  mutation(
        $username: String!,
        $group: Boolean!,
        $description: String,
        $owner: String,
        $manager: String,
        $founder: String,
        $founded: String,
        $stadium: String,
        $image: String,
        $coverImage: String
    ){
     signup(
           username:$username,
           group:$group
           description: $description
           owner: $owner
           manager: $manager
           founder: $founder
           founded: $founded
           stadium: $stadium
           image: $image
           coverImage: $coverImage
           ){
            token
     }
  }
`

/** A user can login */
export const SIGN_IN = gql`
  mutation($username: String!) {
     signin(username:$username){
       username,
       group,
       token
     }
  }
`
/** Edits teams profile only accesible to admins */
export const EDIT_USER_PROFILE = gql`
   mutation($id:ID, $fullname:String, $location:String, $description:String){
     editUserProfile(id:$id, fullname:$fullname, location:$location, description:$description){
      ${authUserPayload}
     }
   }
`
