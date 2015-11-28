import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  propTypes: {
    winner: PropTypes.string.isRequired,
  },
  mixins: [PureRenderMixin],
  render: function render() {
    // XXX: className?
    // https://facebook.github.io/react/docs/class-name-manipulation.html
    // (`classnames`: programatically assign classes without manual concatenation)
    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );
  },
});
