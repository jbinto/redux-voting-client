import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Toronto', 'Chicago');
const tally = Map({'Toronto': 22, 'Chicago': 3});

export default React.createClass({
  render: function() {
    console.debug('App.jsx render called');
    // from tutorial:
    //  We use React's cloneElement API to create a clone of the original
    //  components with our custom pair prop attached. This is just a temporary
    //  measure, and we'll be able to remove the cloning call later.

    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
});
