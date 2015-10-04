import React from 'react';

export default React.createClass({
  render: function() {
    // XXX: className?
    // https://facebook.github.io/react/docs/class-name-manipulation.html
    // (`classnames`: programatically assign classes without manual concatenation)
    return <div className="winner">
      Winner is {this.props.winner}!
    </div>
  }
});
