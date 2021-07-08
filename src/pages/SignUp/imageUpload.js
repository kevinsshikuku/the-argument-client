import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddAPhoto from '@material-ui/icons/AddAPhoto';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));



/**
 * Component for uploading post image
 */
const ImageUpload = ({ handleChange }) => {
    const classes = useStyles();

  return(
 <div>

  <input
      accept="image/x-png,image/jpeg"
      name="image"
      placeholder="coverImage"
      className={classes.input}
      onChange={handleChange}
      id="icon-button-file"
      type="file"
         />
  <label htmlFor="icon-button-file">
    <IconButton color="primary" aria-label="upload picture" size="medium" component="span" >
          <AddAPhoto style={{fontSize:"xx-large"}} />
    </IconButton>
  </label>
     <br/>
  </div>
  )

};

export default ImageUpload;

