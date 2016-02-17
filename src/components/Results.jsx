import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from '../components/Winner';
import * as actionCreators from '../action_creators';

export const Results = React.createClass({
  propTypes: {
    pair: PropTypes.any, // Immutable or plain array
    tally: PropTypes.any, // Immutable or plain map
    winner: PropTypes.string,
    next: PropTypes.func,
  },
  mixins: [PureRenderMixin],
  getPair: function getPair() {
    return this.props.pair || [];
  },
  getVotes: function getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  render: function render() {
    if (this.props.winner) {
      return <Winner ref="winner" winner={this.props.winner} />;
    }

    return (
      <div className="results">
        <div className="tally">
          {this.getPair().map(entry =>
            <div key={entry} className="entry">
              <h1>{entry}</h1>
              <div className="voteCount">
                <h1>{this.getVotes(entry)}</h1>
              </div>
            </div>
          )}
        </div>
        <div className="management">
          <button ref="next" className="next" onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
  };
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators    // still in awe of this pattern
)(Results);
