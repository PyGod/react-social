import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.sass';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Typography } from '@mui/material';

const NavBarData = [
  { title: 'Profile', icon: <AccountCircleIcon />, link: '/profile' },
  { title: 'Messages', icon: <MessageIcon />, link: '/dialogs' },
  { title: 'Users', icon: <PeopleIcon />, link: '/users' },
];

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      {NavBarData.map((val, key) => {
        return (
          <NavLink
            to={val.link}
            activeClassName={classes.active}
            className={classes.item}
            key={key}
          >
            <Box sx={{ padding: '20px' }}>{val.icon}</Box>

            <Typography>{val.title}</Typography>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navbar;
