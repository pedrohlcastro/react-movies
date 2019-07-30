import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Main from '../pages/Main';
import Details from '../pages/Details';

import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/details/:id" component={Details} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
