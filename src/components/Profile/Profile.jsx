import React from 'react';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.sass';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  return (
    <div className={classes.profile}>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        savePhoto={savePhoto}
      />

      <MyPostsContainer />
    </div>
  );
};

export default Profile;
