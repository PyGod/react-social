import { Box } from '@mui/material';
import React from 'react';
import classes from './Message.module.sass';

const Message = (props) => {
  return <Box className={classes.message}>{props.message}</Box>;
};

export default Message;
