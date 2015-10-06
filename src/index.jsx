import React from 'react';
import Voting from './components/Voting';
// import store from './store'

// This works because
// 1) webpack-css-loader
// 2) we're in a JSX file, so the output (??)
require('./style.css');

const pair = ['Toronto', 'Calgary'];

// XXX
const vote = (entry) => {
  // store.dispatch({type: 'VOTE', entry})
  // ?? how to set hasVoted ??
}

React.render(
  <Voting pair={pair} vote={vote} />,
  document.getElementById('app')
);
