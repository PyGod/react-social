import { connect } from 'react-redux';
import { compose } from 'redux';

import { addPost, updateNewPostText } from '../../../redux/profileReducer';

import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  
  return {
    posts: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = {
  updateNewPostText,
  addPost,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(MyPosts);
