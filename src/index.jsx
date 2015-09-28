import React from 'react';
import Voting from './components/Voting';

const pair = ['Toronto', 'Calgary'];

React.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
