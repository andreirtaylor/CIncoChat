import React from 'react';
import browserHistory from './history';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import Login from 'views/Login';
import Profile from 'views/Profile';
import Register from 'views/Register';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};
const NotFound = ({ component: Component, ...rest }) => (
  <div> Wrong Turn </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('LoggedIn') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default Routes;
