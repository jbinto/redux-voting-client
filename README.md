# jbinto/redux-voting-client

This is a React / Redux frontend for [jbinto/redux-voting-server](https://github.com/jbinto/redux-voting-server).

I am following [@teropa](https://twitter.com/teropa)'s "[Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)", as of late Sept 2015.

## Usage

```
webpack-dev-server
open http://localhost:8080
```

## Notes

* CSS taken verbatim from [this commit](https://github.com/teropa/redux-voting-client/commit/css)

Dependencies introduced:

* https://github.com/JedWatson/classnames
* https://github.com/webpack/css-loader
* https://github.com/webpack/style-loader
* https://github.com/passy/autoprefixer-loader

TODO: Update `Results.jsx`, `Vote.jsx`, `Index.jsx` with presentation logic (found in above commit)
