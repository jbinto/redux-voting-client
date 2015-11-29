/* eslint new-cap: [2, {capIsNewExceptions: ["Map"]}] */

import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  if (state.getIn(['vote', 'pair']).contains(entry))
    return state.set('votedFor', entry);

  return state;
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'VOTE':
    return vote(state, action.entry);
  default:
    return state;
  }
}
