import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

// This is a "[dumb|pure] component".
//
// "The components don't try to do much about those actions themselves.
//  They merely invoke callback props."

export default React.createClass({
  propTypes: {
    pair: PropTypes.any.isRequired,
    votedFor: PropTypes.string,
    vote: PropTypes.func,
  },
  mixins: [PureRenderMixin],
  getPair: function getPair() {
    return this.props.pair || [];
  },
  isDisabled: function isDisabled() {
    // !! coerces to boolean; basically "isTruthy"
    return !!this.props.votedFor;
  },
  hasVotedFor: function hasVotedFor(entry) {
    return this.props.votedFor === entry;
  },

  render: function render() {
    // JSX is weird, but "give it 5 minutes"
    // 1) Cool: ES6 arrow function (expression only), that returns JSX
    // 2) React concept: key
    //    https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    return (
      <div className="voting">
        {this.getPair().map(entry =>
          <button key={entry}
                  disabled={this.isDisabled()}
                  className={classNames({ voted: this.hasVotedFor(entry) })}
                  onClick={() => this.props.vote(entry)}>
            <h1>{entry}</h1>
            {this.hasVotedFor(entry)
              ? <div className="label">Voted</div>
              : null
            }
          </button>
        )}
      </div>
    );
  },
});
