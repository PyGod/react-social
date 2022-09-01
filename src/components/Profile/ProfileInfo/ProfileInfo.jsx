import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.sass';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import mainBackground from '../../../assets/images/game-hub-new-logo-01.png';
import userPhoto from '../../../assets/images/user.jpg';
import UploadButton from '../../common/Buttons/UploadButton/UploadButton';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  // const [open, setOpen] = useState(false);
  // const [currentImage, setCurrentImage] = useState('');
  // const button = <Button>Close</Button>;

  if (!profile) {
    return <Preloader />;
  }

  // const handleOpen = (img) => {
  //   setOpen(!open);
  //   setCurrentImage(img);
  // };

  // const handleClose = () => {
  //   setOpen(open);
  // };

  const onAvatarSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className={classes.background}>
        <img
          src={mainBackground}
          alt="https://gamehub.om/wp-content/uploads/2019/11/game-hub-new-logo-01.png"
        />
      </div>
      <div className={classes.descriptionBlock}>
        <span className={classes.fullName}>{profile.fullName}</span>
        {/* <GridList className={classes.gridList}>
          <GridListTile
            key={profile.photos.large}
            className={classes.gridListTile}
            style={{ height: '100%', width: 'inherit' }}
          >
            <img
              src={profile.photos.large ? profile.photos.large : userPhoto}
              alt="Avatar"
            />
            <GridListTileBar
              actionIcon={
                <IconButton onClick={() => handleOpen(profile.photos.large)}>
                  <ZoomInIcon style={{ color: 'white' }} />
                </IconButton>
              }
              className={classes.gridTileBar}
            />
          </GridListTile>
        </GridList>
        <Dialog open={open} onClose={handleClose}>
          <img src={currentImage} alt="" style={{ width: '100%' }} />
        </Dialog> */}
        <img
          src={profile.photos.large ? profile.photos.large : userPhoto}
          alt="Avatar"
        />
        {isOwner && (
          <div>
            <UploadButton
              onAvatarSelected={onAvatarSelected}
              text="Upload Photos"
            />
          </div>
        )}
        <div>
          {/* <ProfileStatus status={props.status} updateStatus={props.updateStatus}/> */}

          <ProfileStatus
            isOwner={isOwner}
            status={status}
            updateStatus={updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

// ProfileInfo.propTypes = {
//   open: PropTypes.bool,
// };
export default ProfileInfo;
