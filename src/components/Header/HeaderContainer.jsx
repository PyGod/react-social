import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleFetching } from '../../redux/authReducer';
import { compose } from 'redux';
import { logout } from '../../redux/authReducer';

const HeaderContainer = (props) => {
  return <Header {...props} />;
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    isFetching: state.auth.isFetching,
  };
};

const mapDistpachToProps = {
  toggleFetching,
  logout,
};

export default compose(
  connect(mapStateToProps, mapDistpachToProps),
  withRouter
)(HeaderContainer);
