import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PhotoTwoTone from '@material-ui/icons/PhotoTwoTone';
import classes from '../UploadButton/UploadButton.module.sass';
const UploadButton = (props) => {
  return (
    <>
      <input
        type="file"
        onChange={props.onAvatarSelected}
        id="file"
        accept="image/*"
        className={classes.inputFile}
      />
      <label htmlFor="file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<PhotoTwoTone />}
          
        >
          {props.text}
        </Button>
      </label>
      <label htmlFor="file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </>
  );
};

export default UploadButton;
