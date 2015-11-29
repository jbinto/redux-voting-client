/* eslint new-cap: [2, {capIsNewExceptions: ["Map"]}] */
/* (above: Make ESLint happy about Map() not being a real constructor) */

import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function resetVote(state) {
  const votedFor = state.get('votedFor');
  const currentPair = state.getIn(['vote', 'pair']);
  if (votedFor && !currentPair.includes(votedFor)) {
    return state.remove('votedFor');
  }

  return state;
}

function vote(state, entry) {
  if (state.getIn(['vote', 'pair']).contains(entry)) {
    return state.set('votedFor', entry);
  }

  return state;
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  default:
    return state;
  }
}
