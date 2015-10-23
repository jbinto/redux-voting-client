import {List} from 'immutable';
import {Voting} from '../../src/components/Voting';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

// ES6 object destructuring
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} = TestUtils;

describe('Voting', () => {

  // I couldn't take the constant typing. DRYer this way and lambda syntax is terse.
  const getButtons = (component) => scryRenderedDOMComponentsWithTag(component, "button");

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} />
    );

    // scry: "foretell the future using a crystal ball or other reflective object or surface."
    // scryRenderedDOMComponentsWithTag:
    //  "Finds all instances of components in the rendered tree that are DOM components with the tag name matching tagName."
    //  https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithtag

    const buttons = getButtons(component);

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Toronto');
    expect(buttons[1].textContent).to.equal('Chicago');


  });

  it('invokes callback when a button is clicked', () => {
    // This is a "[dumb|pure] component".
    // "The components don't try to do much about those actions themselves.
    //  They merely invoke callback props."

    // set up a spy callback
    let votedFor;
    const vote = (entry) => votedFor = entry;

    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']}
              vote={vote} />

    );

    const buttons = getButtons(component);

    // https://facebook.github.io/react/docs/test-utils.html
    Simulate.click(buttons[0]);

    expect(votedFor).to.equal('Toronto');

  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} votedFor="Chicago" />
    );

    const buttons = getButtons(component);
    expect(buttons.length).to.equal(2);

    const isDisabled = (b) => b.hasAttribute('disabled');
    buttons.forEach((b) => {
      expect(isDisabled(b)).to.be.true;
    });

  });

  it('adds label to voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} votedFor="Chicago" />
    );

    const buttons = getButtons(component);
    const labelText = buttons[1].textContent;

    // textContent is basically innerHTML but strips all tags;
    //  would be 'ChicagoVoted'
    expect(labelText).to.contain('Voted');
  });


  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} winner="Chicago" />
    );

    const label = component.refs.winner;
    const text = ReactDOM.findDOMNode(label).textContent;

    expect(text).to.equal('Winner is Chicago!');

  });

  it('renders as a pure component (no deep equality checking)', () => {
    // note: As of React 0.14 `setProps` is deprecated.
    // Instead of using renderIntoDocument, render into a div,
    // then explicitly call ReactDOM.render with different props.
    // See http://stackoverflow.com/a/30616091/19779

    const node = document.createElement('div');
    const pair = ['Toronto', 'Chicago'];
    const component = ReactDOM.render(
      <Voting pair={pair} />,
      node
    );

    let getFirstButtonText = (component) =>
      getButtons(component)[0].textContent;

    expect(getFirstButtonText(component)).to.equal('Toronto');

    // Now mutate the initial array.
    // Normally, React will re-render, even when deep values are changed.
    // With PureRenderMixin, only reference equality is checked.

    pair[0] = 'New York';

    ReactDOM.render(
      <Voting pair={pair} />,
      node
    )

    expect(getFirstButtonText(component)).to.equal('Toronto');

  });

  it('does re-render when you pass it a different immutable list)', () => {
    const node = document.createElement('div');
    const pair = List(['Toronto', 'Chicago']);
    const component = ReactDOM.render(
      <Voting pair={pair} />,
      node
    );

    let getFirstButtonText = (component) =>
      getButtons(component)[0].textContent;

    expect(getFirstButtonText(component)).to.equal('Toronto');

    // Now mutate the initial array.
    // Normally, React will re-render, even when deep values are changed.
    // With PureRenderMixin, only reference equality is checked.

    let newPair = pair.set(0, 'New York');
    ReactDOM.render(
      <Voting pair={newPair} />,
      node
    )
    expect(getFirstButtonText(component)).to.equal('New York');

  });


});
