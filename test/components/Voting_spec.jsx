import Voting from '../../src/components/Voting';
import React from 'react/addons';
import {expect} from 'chai';

// ES6 object destructuring
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} = React.addons.TestUtils;

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
    expect(buttons[0].getDOMNode().textContent).to.equal('Toronto');
    expect(buttons[1].getDOMNode().textContent).to.equal('Chicago');


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
    Simulate.click(buttons[0].getDOMNode());

    expect(votedFor).to.equal('Toronto');

  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} votedFor="Chicago" />
    );

    const buttons = getButtons(component);
    expect(buttons.length).to.equal(2);

    const isDisabled = (b) => b.getDOMNode().hasAttribute('disabled');
    buttons.forEach((b) => {
      expect(isDisabled(b)).to.be.true;
    });

  });

  it('adds label to voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} votedFor="Chicago" />
    );

    const buttons = getButtons(component);
    const labelText = buttons[1].getDOMNode().textContent;

    // textContent is basically innerHTML but strips all tags;
    //  would be 'ChicagoVoted'
    expect(labelText).to.contain('Voted');
  });


  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} winner="Chicago" />
    );

    const label = component.refs.winner;
    const text = label.getDOMNode().textContent;

    expect(text).to.equal('Winner is Chicago!');

  });

  it('renders as a pure component (no deep equality checking)', () => {
    const pair = ['Toronto', 'Chicago'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let getFirstButtonText = (component) =>
      getButtons(component)[0].getDOMNode().textContent;

    expect(getFirstButtonText(component)).to.equal('Toronto');

    // Now mutate the initial array.
    // Normally, React will re-render, even when deep values are changed.
    // With PureRenderMixin, only reference equality is checked.

    pair[0] = 'New York';
    component.setProps({pair: pair});
    expect(getFirstButtonText(component)).to.equal('Toronto');

  });

});
