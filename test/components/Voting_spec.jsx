import Voting from '../../src/components/Voting';
import React from 'react/addons';
import {expect} from 'chai';

// ES6 object destructuring
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = React.addons.TestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Toronto', 'Chicago']} />
    );

    // scry: "foretell the future using a crystal ball or other reflective object or surface."
    // scryRenderedDOMComponentsWithTag:
    //  "Finds all instances of components in the rendered tree that are DOM components with the tag name matching tagName."
    //  https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithtag

    const buttons = scryRenderedDOMComponentsWithTag(component, "button");

    expect(buttons.length).to.equal(2);
    expect(buttons[0].getDOMNode().textContent).to.equal('Toronto');
    expect(buttons[1].getDOMNode().textContent).to.equal('Chicago');


  });

});
