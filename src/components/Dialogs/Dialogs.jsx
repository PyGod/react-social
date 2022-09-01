import React from 'react';
import DialogItem from './DialogItem/DialogItems';
import Message from './Message/Message';
import classes from './Dialogs.module.sass';
import SendIcon from '@mui/icons-material/Send';
import { Redirect } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import {
  composeValidators,
  maxLengthCreator,
} from '../../utils/validators/validators';
import { FormControls } from '../common/FormsControls/FormsControls';
import { Box, Button } from '@mui/material';

const Textarea = FormControls('textarea');
const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogsData.map((dialog) => {
    return <DialogItem id={dialog.id} key={dialog.id} name={dialog.name} />;
  });

  let messagesElements = state.messagesData.map((message) => {
    return (
      <Message id={message.id} key={message.id} message={message.message} />
    );
  });

  const onNewMessageChange = (text) => {
    props.updateNewMessageText(text);
  };
  const addNewMessage = (values) => {
    if (
      !values.newMessageBody ||
      values.newMessageBody.replace(/\s+/, '') === ''
    ) {
      return;
    }
    props.sendMessage();
  };

  if (!props.isAuth) return <Redirect to="/login" />;

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        {messagesElements}
        <AddMessageForm
          onSubmit={addNewMessage}
          onNewMessageChange={onNewMessageChange}
        />
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <Form
      onSubmit={(values, form) => {
        props.onSubmit(values);
        setTimeout(() => {
          form.reset(values.newMessageBody);
        }, 0);
      }}
      render={(renderProps) => {
        const { handleSubmit } = renderProps;

        return (
          <form onSubmit={handleSubmit}>
            <Box>
              <Field
                component={Textarea}
                name="newMessageBody"
                placeholder="Enter your message..."
                validate={composeValidators(maxLengthCreator(100))}
              />
              <OnChange name="newMessageBody">
                {(value) => {
                  props.onNewMessageChange(value);
                }}
              </OnChange>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: '15px' }}
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
export default Dialogs;
