import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingInProgress,
  getUsers,
} from '../../redux/usersReducer';
import Users from './Users';
// import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {
  getUsersData,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/usersSelectors';

const UsersContainer = (props) => {
  const { currentPage, pageSize, getUsers } = props;

  const onPageChanged = (pageNumber) => {
    const { getUsers, pageSize } = props;
    getUsers(pageNumber, pageSize);
  };

  useEffect(() => {
    getUsers(currentPage, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Users
        {...props}
        onPageChanged={onPageChanged}
        isFetching={props.isFetching}
      />
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     usersData: state.usersPage.usersData,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

const mapStateToProps = (state) => {
  return {
    usersData: getUsersData(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

const mapDispatchToProps = {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingInProgress,
  getUsers,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  UsersContainer
);
