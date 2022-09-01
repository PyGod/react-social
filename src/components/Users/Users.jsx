import React from 'react';
import UsersItem from './UsersItem/UsersItem';
import classes from './Users.module.sass';
import { Pagination } from '../common/Pagination/Pagination';
import Preloader from '../common/Preloader/Preloader';
const Users = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  usersData,
  ...props
}) => {
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {props.isFetching ? (
        <Preloader />
      ) : (
        <div className={classes.user}>
          {usersData.map((u) => (
            <UsersItem user={u} key={u.id} {...props} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
