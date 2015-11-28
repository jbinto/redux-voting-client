import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';


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
export const VotingContainer = connect(mapStateToProps)(Voting);
