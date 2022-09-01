import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.sass';
import userPhoto from '../../../assets/images/user.jpg';
import { Avatar, Box } from '@mui/material';
const DialogItem = (props) => {
  let path = `/dialogs/${props.id}`;
  return (
    <Box className={`${classes.dialog} `}>
      <Avatar src={userPhoto} alt="" sx={{ width: '54px', height: '54px' }} />
      <NavLink to={path} activeClassName={classes.active}>
        {props.name}
      </NavLink>
    </Box>
  );
};

export default DialogItem;
