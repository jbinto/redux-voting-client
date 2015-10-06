import React from 'react';
import {List} from 'immutable';
import {RouteHandler} from 'react-router';

const pair = List.of('Toronto', 'Chicago');

export default React.createClass({
  render: function() {
    console.debug('App.jsx render called');
    // RouteHandler is like Ember's {{outlet}}
    return <RouteHandler pair={pair} />
  }
});
