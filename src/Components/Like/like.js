import React from 'react';
import {useMutation} from "@apollo/client";
import { useAuthState } from '../../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import  { FavoriteBorder, Favorite} from "@material-ui/icons";
import { CREATE_LIKE  } from '../../Graphql/like';

const useStyles = makeStyles((theme) => ({
  button: {
     color: "purple",
    '&:hover': {
      color: "blue",
      fontSize:"2rem"
    },
  },
}))

/** Like buton adds like to message*/
const LikeButton = ( { messageId, likes} ) => {
      const classes = useStyles();
      const  { user } = useAuthState();


//..............Detect which mutation to use...............................//
  const operation = 'create';
  const options = {
    create: {
      mutation: CREATE_LIKE,
      variables: { messageId },
    },
  };

const [createLike] = useMutation(options[operation].mutation,{
      variables: { ...options[operation].variables},
})

let length;
if(likes){
  length  = likes.length
}else{
   return 0
}


//..........................button logic ........................................//
let likeButton;

  likeButton = ( user ?
      <div  onClick={ () => createLike()}> <Favorite  className={classes.button}/> <b>{likes.length}</b></div> :

      <div><FavoriteBorder /><b>{ length  }</b></div>
  )

    return(
    <>
      {likeButton}
    </>
    )
}
export default LikeButton;