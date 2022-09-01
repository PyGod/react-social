import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/objectHelper';

const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IN_FOLLOWING_PROGRESS = 'TOGGLE_IN_FOLLOWING_PROGRESS';

let initialState = {
  usersData: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_SUCCESS:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: true,
        }),
      };

    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: false,
        }),
      };

    case SET_USERS:
      return { ...state, usersData: action.usersData };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_IN_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW_SUCCESS, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW_SUCCESS, userId });
export const setUsers = (usersData) => ({ type: SET_USERS, usersData });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

export const toggleFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const toggleFollowingInProgress = (isFetching, userId) => ({
  type: TOGGLE_IN_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const getUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleFetching(true));

    const data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleFetching(false));

    dispatch(setUsers(JSON.parse(JSON.stringify(data.items))));
    dispatch(setTotalUsersCount(JSON.parse(JSON.stringify(data.totalCount))));
    dispatch(setCurrentPage(page));
  };
};

const followUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleFollowingInProgress(true, userId));
  const resultCode = await apiMethod(userId);
  if (resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
  };
};

export default usersReducer;
