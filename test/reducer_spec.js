import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Toronto', 'Chicago'),
          tally: Map({'Toronto': 1})
        })
      })
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Toronto', 'Chicago'],
        tally: {'Toronto': 1}
      }
    }));

  });

  it('handles SET_STATE with undefined initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Toronto', 'Chicago'),
          tally: Map({'Toronto': 1})
        })
      })
    };

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Toronto', 'Chicago'],
        tally: {'Toronto': 1}
      }
    }));

  });

  it('handles VOTE by setting votedFor', () => {
    const state = fromJS({
      vote: {
        pair: ['Toronto', 'Kansas'],
        tally: { 'Toronto': 5 }
      },
    });

    const action = {
      type: 'VOTE',
      entry: 'Kansas'
    };

    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Toronto', 'Kansas'],
        // XXX: The client side reducer does NOT increment the tally.
        // It only sets `votedFor`. Async actions will do the rest.
        tally: { 'Toronto': 5 }
      },
      votedFor: 'Kansas'
    }));

  });


  it('does not do anything when getting VOTE for invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Toronto', 'Kansas'],
        tally: { 'Toronto': 5 }
      },
    });

    const action = {
      type: 'VOTE',
      entry: 'Chicago'
    };

    const nextState = reducer(state, action);

    expect(nextState).to.equal(state);

  });

});
