import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// https://github.com/tmpvar/jsdom#for-the-hardcore-jsdomjsdom
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// https://github.com/tmpvar/jsdom#creating-a-browser-like-window-object
const win = doc.defaultView;

global.document = doc;
global.window = win;

// "Additionally, we need to take all the properties that the jsdom window
//  object contains, such as navigator, and hoist them on to the Node.js
//  global object. This is done so that properties provided by window can
//  be used without the window. prefix, which is what would happen in a
//  browser environment."

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
