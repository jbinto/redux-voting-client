import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

// "The big idea of react-redux is to take our pure components
//  and wire them up into a Redux Store by doing two things:
//  * Mapping the Store state into component input props.
//  * Mapping actions into component output callback props."
// http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#getting-data-in-from-redux-to-react
import {Provider} from 'react-redux';

import io from 'socket.io-client';

import reducer from './reducer';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
// import store from './store'

// This works because
// 1) webpack-css-loader
// 2) we're in a JSX file, so the output (??)
require('./style.css');

const socket = io.connect(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => {
  store.dispatch(setState(state));
});


// Using applyMiddleware gives us a new `createStore` function
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

// https://github.com/rackt/redux/blob/master/docs/api/createStore.md
const store = createStoreWithMiddleware(reducer);

const routes = (
  <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
  </Route>
);


ReactDOM.render(
  // https://github.com/rackt/react-redux/blob/master/docs/api.md#provider-store
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
