import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import './Header.module.sass';
import classes from './Header.module.sass';
import { Button } from '@mui/material';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <a href="/">
        <img
          src="https://cdn.shopify.com/shopifycloud/hatchful-web/assets/67cbe9b74baf7f893488c5fc426d31eb.png"
          alt=""
        />
      </a>

      {props.isAuth ? (
        <div className={classes.loginBlock}>
          <Typography className={classes.fullName}>{props.login}</Typography>

          <Button
            to="/login"
            onClick={props.logout}
            className={classes.loginLink}
            component={NavLink}
            variant="contained"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button variant="contained" component={NavLink} to="/login">
          {<Redirect to="/login" />}Login
        </Button>
      )}
    </header>
  );
};

export default Header;
