import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
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

});
