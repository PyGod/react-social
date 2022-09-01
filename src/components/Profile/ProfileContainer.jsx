import React, { useEffect } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const ProfileContainer = (props) => {
  const updateProfile = () => {
    let userId = props.match.params.userId;
    userId = Number(userId);

    if (props.isAuth && isNaN(userId)) {
      props.history.push('/profile');
    }
    if (!userId) {
      userId = props.authorizedUserId;

      if (!userId) {
        props.history.push('/login');
      }
    }

    if (userId) {
      props.getProfile(userId);
      props.getStatus(userId);
    }
  };

  useEffect(() => {
    updateProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.userId]);

  return (
    <Profile
      {...props}
      isOwner={!props.match.params.userId}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

const mapDispacthToProps = {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
};

export default compose(
  connect(mapStateToProps, mapDispacthToProps),
  withRouter
)(ProfileContainer);
