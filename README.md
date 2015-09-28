# jbinto/redux-voting-client

This is a React / Redux frontend for [jbinto/redux-voting-server](https://github.com/jbinto/redux-voting-server).

I am following [@teropa](https://twitter.com/teropa)'s "[Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)", as of late Sept 2015.

## Usage

### Hot loading in the browser

```
webpack-dev-server
open http://localhost:8080
```

### Run tests

```
npm run test:watch
```

### Debug tests

Add `debugger` statements to tests. Then,

```
node-inspector --web-port 1234
npm run test:watch:debug
open http://127.0.0.1:1234/?ws=127.0.0.1:1234&port=5858
```

## Notes

* CSS taken verbatim from [this commit](https://github.com/teropa/redux-voting-client/commit/css)

Dependencies introduced:

* https://github.com/JedWatson/classnames
* https://github.com/webpack/css-loader
* https://github.com/webpack/style-loader
* https://github.com/passy/autoprefixer-loader

TODO: Update `Results.jsx`, `Vote.jsx`, `Index.jsx` with presentation logic (found in above commit)

* ~~`mocha` won't automatically reload `.jsx` files in `test/components` when called with `--watch`. It does call these tests manually, it's just not watching the files. grr.~~

**FIXED:** Specify `--watch-extensions jsx` on the `test:watch` scrpit.
