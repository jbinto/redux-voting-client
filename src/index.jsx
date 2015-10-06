import React from 'react';
// never seen these 2 import syntaxes mixed.
import Router, {Route, DefaultRoute} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';
// import store from './store'

// This works because
// 1) webpack-css-loader
// 2) we're in a JSX file, so the output (??)
require('./style.css');

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={Voting} />
  </Route>
);


// XXX
const vote = (entry) => {
  // store.dispatch({type: 'VOTE', entry})
  // ?? how to set hasVoted ??
}

// react-router gives us a Root component (class, not instance)
// then we send it to React.render, telling it where to mount.
Router.run(routes, (Root) => {
  console.log("index.jsx Router.run called");
  React.render(
    <Root />,
    document.getElementById('app')
  );
})
