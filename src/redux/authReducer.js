import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_ERROR = 'SET_ERROR';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  error: [],
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const toggleFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  captchaUrl,
});

export const getAuthUserData = () => async (dispatch) => {
  const authData = await authAPI.authMe();
  if (authData.resultCode === 0) {
    let { id, email, login } = authData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    const authData = await authAPI.login(email, password, rememberMe, captcha);
    if (authData.resultCode === 0) {
      dispatch(getAuthUserData());
    }
    if (authData.resultCode !== 0) {
      dispatch(setError(authData.messages[0]));
    }
    if (authData.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const authData = await authAPI.logout();
    if (authData.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch) => {
    const captchaUrl = await securityAPI.getCaptchaUrl();

    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
