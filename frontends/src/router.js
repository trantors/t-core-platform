import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import NotFound from './routes/NotFound';
import Users from './routes/Users';
import Pm2Server from './routes/Pm2Server';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/pm2server" component={Pm2Server} />
      <Route path="*" component={NotFound} />
    </Router>
  );
};
