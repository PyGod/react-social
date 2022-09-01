import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { required } from '../../utils/validators/validators';
import { FormControls } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.sass';
import { Box, Button, Typography } from '@mui/material';

const LoginForm = ({ login, error, captchaUrl }) => {
  const Input = FormControls('input');

  const onSubmit = (values) => {
    login(values.email, values.password, values.rememberMe, values.captcha);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={(renderProps) => {
        const { handleSubmit } = renderProps;

        return (
          <form onSubmit={handleSubmit}>
            <div className={classes.inputWrapper}>
              <Typography component="label">Login</Typography>
              <Field
                name="email"
                component={Input}
                placeholder="Enter your email"
                validate={required}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>Password</label>
              <Field
                name="password"
                component={Input}
                placeholder="Enter your password"
                validate={required}
                type="password"
              />

              {error !== undefined && (
                <div className={classes.error}>{error}</div>
              )}

              {captchaUrl && <img src={captchaUrl} alt="" />}

              {captchaUrl && (
                <Field
                  placeholder="Symbols"
                  name="captcha"
                  validate={required}
                  component={Input}
                />
              )}
            </div>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
              }}
            >
              <label>remember me</label>
              <Field
                name="rememberMe"
                type="checkbox"
                component={Input}
                className={classes.checkbox}
              />

              <Button variant="contained" onClick={handleSubmit}>
                Login
              </Button>
            </Box>
          </form>
        );
      }}
    />
  );
};

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className={classes.loginFormWrapper}>
      <h1>LOGIN</h1>
      <LoginForm {...props} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    captchaUrl: state.auth.captchaUrl,
  };
};

const mapDistpachToProps = {
  login,
};

export default connect(mapStateToProps, mapDistpachToProps)(Login);
