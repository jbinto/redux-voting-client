import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';

// Imports all named exports from `action_creators` module
// into an object named `actionCreators`.
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  propTypes: {
    winner: PropTypes.string,
  },
  mixins: [PureRenderMixin],
  render: function render() {
    return (
      <div>
        {this.props.winner ?
          <Winner ref="winner" winner={this.props.winner} /> :
          // ... notation is "JSX Spread Attributes"
          // https://facebook.github.io/react/docs/jsx-spread.html
          <Vote {...this.props} />
        }
      </div>
    );
  },
});

function mapStateToProps(state) {
  // Given the Redux-store state tree, return attributes (React props)
  // for the <Voting> component.
  return {
    // getIn: https://facebook.github.io/immutable-js/docs/#/Iterable/getIn
    pair: state.getIn(['vote', 'pair']),
    votedFor: state.get('votedFor'),
    winner: state.get('winner'),
  };
}

// "With react-redux we get a function called connect that can do the wiring-up
//  of a component. It takes a mapping function as an argument and returns
//  another function that takes a React component class:
//
//  connect(mapStateToProps)(SomeComponent);
//
//  The role of the mapping function is to map the state from the Redux Store
//  into an object of props. Those props will then be merged into the props of
//  the component that's being connected."
//
//  http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#getting-data-in-from-redux-to-react

//  XXX CLEVER
//  We also provide the "mapDispatchToProps" callback by directly importing
//  the actionCreators module, which maps perfectly to the struture expected
//  by react-redux connect. The action creators `setState` and `vote` are also
//  callbacks on the <VotingContainer>.
//
//  XXX what about dispatch? This doesn't make any sense. Redux passes dispatch
//  to the 2nd callback. actionCreators is an OBJECT, not a FUNCTION. WTF?
//
//  OK. Read the code.
//   https://github.com/rackt/react-redux/blob/6c03cb78b337fa6fa705e18a1b369e83d097e42f/src/components/connect.js#L27
//
//  If `mapDispatchToProps` is a plain object, Redux calls `wrapActionCreators`,
//  which returns a curried(?) function... calling `bindActionCreators`...
//
//  Wait, what about the docs?
//
//  `bindActionCreators` docs:
//  http://rackt.org/redux/docs/api/bindActionCreators.html
//
//  Salient point: "[Returns a]n object mimicking the original object, but with
//  each function immediately dispatching the action returned by the
//  corresponding action creator."
//
// `connect` docs:
// https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
//
// "If an object is passed, each function inside it will be assumed to be a
//  Redux action creator. An object with the same function names, but bound to
//  a Redux store, will be merged into the component’s props."

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
