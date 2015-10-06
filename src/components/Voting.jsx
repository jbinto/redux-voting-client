import React from 'react/addons';
import Winner from './Winner';
import Vote from './Vote';


export default React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function() {
      return <div>
        {this.props.winner ?
          <Winner ref="winner" winner={this.props.winner} /> :
          // ... notation is "JSX Spread Attributes"
          // https://facebook.github.io/react/docs/jsx-spread.html
          <Vote {...this.props} />
        }
      </div>;
  }
});
