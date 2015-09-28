import React from 'react';
import Voting from './components/Voting';

// This works because
// 1) webpack-css-loader
// 2) we're in a JSX file, so the output (??)
require('./style.css');

const pair = ['Toronto', 'Calgary'];

React.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
