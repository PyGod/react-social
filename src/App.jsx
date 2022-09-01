import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.sass';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { Container, Grid } from '@material-ui/core';
import Footer from './components/Footer/Footer';
import './App.sass';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);

const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);

const LoginPage = React.lazy(() => import('./components/Login/Login'));

const UsersContainer = React.lazy(() =>
  import('./components/Users/UsersContainer')
);

const App = (props) => {
  useEffect(() => {
    props.initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.initialized) {
    return <Preloader />;
  } else {
    return (
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <HeaderContainer />
          </Grid>
          <Grid container item xs={12} sm={12} md={12} className="section">
            <Grid item xs={4} sm={3} md={2}>
              <Navbar />
            </Grid>

            <Grid item xs={8} sm={9} md={10}>
              <Suspense fallback={<Preloader />}>
                <Switch>
                  <Redirect exact from="/" to="/profile" />
                  <Route path="/dialogs" render={() => <DialogsContainer />} />
                  <Route
                    path="/profile/:userId?"
                    render={() => <ProfileContainer />}
                  />
                  <Route
                    exact
                    path="/users"
                    render={() => <UsersContainer />}
                  />
                  <Route exact path="/login" render={() => <LoginPage />} />
                  <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                </Switch>
              </Suspense>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    );
  }
};

const mapDispacthToProps = {
  initializeApp,
};

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

export default connect(mapStateToProps, mapDispacthToProps)(App);
