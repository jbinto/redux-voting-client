import React from 'react/addons';

export default React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function() {
    // XXX: className?
    // https://facebook.github.io/react/docs/class-name-manipulation.html
    // (`classnames`: programatically assign classes without manual concatenation)
    return <div className="winner">
      Winner is {this.props.winner}!
    </div>
  }
});
