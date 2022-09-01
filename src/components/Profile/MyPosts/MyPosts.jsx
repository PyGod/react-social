import { Box, Button } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Field, Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import {
  composeValidators,
  maxLengthCreator,
} from '../../../utils/validators/validators';
import { FormControls } from '../../common/FormsControls/FormsControls';
import classes from './MyPosts.module.sass';
import Post from './Post/Post';

const Textarea = FormControls('textarea');

const MyPosts = (props) => {
  const postsElement = props.posts.map((post) => {
    return (
      <Post message={post.message} likesCount={post.likesCount} key={post.id} />
    );
  });

  const onAddPost = (value) => {
    if (
      value.newPostText === undefined ||
      value.newPostText.replace(/\s+/, '') === ''
    ) {
      return;
    }

    props.addPost();
  };

  const onPostChange = (values) => {
    props.updateNewPostText(values);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <MyPostForm onAddPost={onAddPost} onPostChange={onPostChange} />
      <div className={classes.posts}>{postsElement}</div>
    </div>
  );
};

const MyPostForm = (props) => {
  return (
    <Form
      onSubmit={(values, form) => {
        props.onAddPost(values);
        setTimeout(() => {
          form.reset(values.newMessageText);
        }, 0);
      }}
      render={(renderProps) => {
        const { handleSubmit } = renderProps;
        return (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Field
                placeholder="Enter the post..."
                name="newPostText"
                component={Textarea}
                validate={composeValidators(maxLengthCreator(10))}
              />
              <OnChange name="newPostText">
                {(value) => {
                  props.onPostChange(value);
                }}
              </OnChange>
              {/* <Field name="sendbutton" component={SendButton} /> */}
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: '15px', width: '170px', height: '35px' }}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </form>
        );
      }}
    />
  );
};

export default MyPosts;
