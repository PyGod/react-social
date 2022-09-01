import { Avatar } from 'antd';
import React from 'react';
import spinner from '../../../assets/images/spinner.svg';

const Preloader = (props) => {
  return <Avatar src={spinner} alt="" />;
};

export default Preloader;
