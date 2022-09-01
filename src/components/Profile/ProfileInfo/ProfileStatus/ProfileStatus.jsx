import React, { useEffect, useState } from 'react';
import classes from './ProfileStatus.module.sass';
import TextField from '@material-ui/core/TextField';
const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const removeEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    let value = e.currentTarget.value;
    setStatus(value);
  };
  return (
    <div>
      {!editMode && props.isOwner && (
        <div>
          <span onDoubleClick={activateEditMode} className={classes.status}>
            {!props.status ? 'изменить статус' : props.status}
          </span>
        </div>
      )}
      {editMode && props.isOwner && (
        <div>
          <TextField
            id={classes.standartBasic}
            label="Your status:"
            onChange={onStatusChange}
            autoFocus
            value={status}
            onBlur={removeEditMode}
          />
        </div>
      )}
      {!props.isOwner && <span>{props.status}</span>}
    </div>
  );
};

export default ProfileStatusWithHooks;
