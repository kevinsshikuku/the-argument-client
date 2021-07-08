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
const CoverImageUpload = ({ handleChange }) => {
    const classes = useStyles();

  return(
 <>
    <input
      accept="image/x-png,image/jpeg"
      name="coverImage"
      placeholder="Image"
      className={classes.input}
      onChange={handleChange}
      id="_icon-btn-file"
      type="file"
         />
  <label htmlFor="_icon-btn-file">
    <IconButton color="secondary" aria-label="upload picture" size="medium" component="span" >
          <AddAPhoto style={{fontSize:"xx-large"}} />
    </IconButton>
  </label>
  </>
  )

};

export default CoverImageUpload;

