import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

// ES6 object destructuring
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = TestUtils;

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Toronto', 'Chicago');
    const tally = Map({'Toronto': 22});

    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');

    const [toronto, chicago] = entries.map(e => e.textContent);
    expect(toronto).to.contain('Toronto');
    expect(toronto).to.contain('22');
    expect(chicago).to.contain('Chicago');
    expect(chicago).to.contain('0');

  });

  it('invokes the next callback when the next button is clicked', () => {
    // closures are neat... right?
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Toronto', 'Chicago');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next}
      />
    );

    // Simulate clicking the `next` button...
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);

  });

  it('renders the winner if there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Toronto"
               pair={['Toronto', 'Chicago']}
               tally={Map()}
      />
    );

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;   // ok ~== truthy (ugh, chai)
    expect(winner.textContent).to.contain('Toronto');


  });

}); // describe Results
