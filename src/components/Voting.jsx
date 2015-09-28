import React from 'react';

export default React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },
  render: function() {
    // JSX is weird, but "give it 5 minutes"
    // 1) Cool: ES6 arrow function (expression only), that returns JSX
    // 2) React concept: key
    //    https://facebook.github.io/react/docs/multiple-components.html#dynamic-children

    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}>
          <h1>Vote {entry}</h1>
        </button>
      )}
    </div>;
  }
});
