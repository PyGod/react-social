import React from 'react';

import classes from './Post.module.sass';

import photo from '../../../../assets/images/user.jpg';
import { Avatar, Box, Typography } from '@mui/material';
const Post = (props) => {
  return (
    <Box className={classes.item}>
      <Avatar alt="Fox" src={photo} sx={{ width: '56px', height: '56px' }} />
      <Typography sx={{ color: 'white', pl: '20px' }}>
        {props.message}
      </Typography>
    </Box>
  );
};

export default Post;
