import { profileAPI } from '../api/api';
import { usersAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
  postsData: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post!", likesCount: 3 },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.postsData.length + 1,
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: '',
      };
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };

    default:
      return state;
  }
};

export const addPost = () => {
  return {
    type: ADD_POST,
  };
};

export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId,
  };
};

export const updateNewPostText = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};

export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};

export const getProfile = (userId) => async (dispatch) => {
  try {
    const data = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(data));
  } catch (error) {
    if (error.response) {
      console.log('Problems with response', error.response.status);
    } else if (error.request) {
      console.log('Problem with request');
    } else {
      console.log('Error', error.message);
    }
  }
};

export const getStatus = (userId) => async (dispatch) => {
  try {
    const data = await profileAPI.getStatus(userId);

    dispatch(setStatus(data));
  } catch (error) {
    if (error.response) {
      console.log('Problems with response', error.response.status);
    } else if (error.request) {
      console.log('Problem with request');
    } else {
      console.log('Error', error.message);
    }
  }
};

export const updateStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file);

  if (response.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.photos));
  }
};

export default profileReducer;
