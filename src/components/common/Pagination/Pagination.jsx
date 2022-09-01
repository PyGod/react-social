import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import classes from './Pagination.module.sass';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Pagination = ({
  currentPage,
  onPageChanged,
  totalItemsCount,
  pageSize,
  portionSize = 10,
}) => {
  let pages = [];
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <Box sx={{ ml: '20px' }}>
      <div className={classes.pagination}>
        {portionNumber !== 1 && (
          <div>
            <button
              className={classes.button}
              onClick={() => {
                setPortionNumber(1);
                onPageChanged(1);
              }}
            >
              start
            </button>
            <button
              className={classes.button}
              onClick={() => {
                setPortionNumber(portionNumber - 1);
                onPageChanged(leftPortionPageNumber - 1);
              }}
            >
              -10
            </button>
          </div>
        )}
        {portionNumber > 1 && (
          <button
            className={classes.button}
            onClick={() => {
              if (currentPage === leftPortionPageNumber) {
                setPortionNumber(portionNumber - 1);
                onPageChanged(leftPortionPageNumber - 1);
              } else {
                onPageChanged(currentPage - 1);
              }
            }}
          >
            Prev
          </button>
        )}
        {pages
          .filter(
            (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map((p) => {
            return (
              <span
                className={
                  currentPage === p ? classes.selectedUser : classes.users
                }
                onClick={() => {
                  onPageChanged(p);
                }}
                key={p}
              >
                {p}
              </span>
            );
          })}
      </div>
      <Box sx={{ display: 'flex', mb: '20px' }}>
        {portionCount > portionNumber && (
          <Box>
            <Button
              className={classes.button}
              onClick={() => {
                if (currentPage === rightPortionPageNumber) {
                  setPortionNumber(portionNumber + 1);
                }
                onPageChanged(currentPage + 1);
              }}
              size="small"
              variant="text"
              sx={{ mr: '5px' }}
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                setPortionNumber(portionNumber + 1);
                onPageChanged(rightPortionPageNumber + 1);
              }}
              variant="text"
              sx={{ mr: '5px' }}
            >
              +10
            </Button>
          </Box>
        )}
        {portionCount && (
          <Button
            className={classes.button}
            onClick={() => {
              setPortionNumber(portionCount);
              onPageChanged(pagesCount - 5);
            }}
            variant="text"
            size="small"
          >
            last
          </Button>
        )}
      </Box>
    </Box>
  );
};
