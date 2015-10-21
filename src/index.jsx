import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results'
// import store from './store'

// This works because
// 1) webpack-css-loader
// 2) we're in a JSX file, so the output (??)
require('./style.css');

const routes = (
  <Route component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={Voting} />
  </Route>
);

ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);
