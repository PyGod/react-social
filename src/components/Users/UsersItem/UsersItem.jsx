import React from 'react';
import classes from './UsersItem.module.sass';
import userPhoto from '../../../assets/images/user.jpg';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Button } from '@mui/material';

const UsersItem = ({ user, follow, unfollow, followingInProgress }) => {
  return (
    <Box className={classes.user}>
      <Box className={classes.followBox}>
        <Box>
          <NavLink to={`/profile/${user.id}`}>
            <Avatar
              sx={{ width: 54, height: 54 }}
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt=""
            />
          </NavLink>
        </Box>
        <Box sx={{ mt: '5px' }}>
          {user.followed ? (
            <Button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
              variant="outlined"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
              variant="contained"
              size="small"
            >
              Follow
            </Button>
          )}
        </Box>
      </Box>
      <div className={classes.info}>
        <div>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </div>

        <div className={classes.location}>
          <div>{'props.user.location.city'}</div>
          <div>{'props.user.location.country'}</div>
        </div>
      </div>
    </Box>
  );
};

export default UsersItem;
