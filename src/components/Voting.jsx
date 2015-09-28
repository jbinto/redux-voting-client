import React from 'react';

// This is a "[dumb|pure] component".
// 
// "The components don't try to do much about those actions themselves.
//  They merely invoke callback props."

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
        <button key={entry}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
        </button>
      )}
    </div>;
  }
});
