import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    children: PropTypes.any.isRequired,
  },
  render: function render() {
    // Now that we're using connected components (<VotingContainer> etc)
    // we no longer pass in dummy data here.

    // This bit of boilerplate is brought to you by react-router.
    // https://github.com/rackt/react-router/issues/1531
    // https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md#routehandler
    return React.cloneElement(this.props.children);
  },
});
