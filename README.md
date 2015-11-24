# express-redirect [![Build Status](https://img.shields.io/travis/phvcky/express-redirect.svg?branch=master)](https://travis-ci.org/phvcky/express-redirect) [![NPM Version](https://img.shields.io/npm/v/express-redirect.svg)](https://www.npmjs.org/package/express-redirect)
**express-redirect** offers you simple and blazing fast redirection rules.
Even very complex redirect rules don't take longer than 1 ms.
It just comes down to concatenating strings.

Say goodbye to writing 10 lines of code for a plain redirection over and over again.

If you want redirections with fancy JS expressions, you should probably check out [deviate](https://github.com/ForbesLindesay/deviate).

## Deprecation Notice

This package isn't actively maintained anymore. It was written for express v3.x, but still 
seems to work with express v4.x. Use it at your own risk.

If you want to continue this project, ping me and I'll add you as an owner on npm.

## Installation
```
$ npm install express-redirect
```

```javascript
var express = require("express")
  , redirect = require("express-redirect");

var app = express();
redirect(app); // mount the plugin
```

## Example

```javascript
// just a smple redirect
app.redirect("/p/:id", "/page/:id");

// you want it permanent?
app.redirect("/p/:id", "/page/:id", 301);

// if you want to append the query string (?foo=bar)
app.redirect("/p/:id", "/page/:id", 301, true);

// no id, goto page # 1
app.redirect("/p/:id?", "/page/:id(1)");

// only redirect POST (for whatever reason)
app.redirect("/contact", "/thanks", "post")

// a bit more complex
app.redirect(
  "/entry/:entry/comments/:action(view|edit|delete)?/:id([0-9]+)/:reply([0-9]+)?",
  "/entry/:entry/comments/:action(view)/:id/:reply?"
);

// external redirects work too
app.redirect(
  "/google/:query?",
  "https://www.google.de/?q=:query(Nyan+Cat)"
);
```

## API
express-redirect mounts the new method `app.redirect(route, target, [status], [method], [qsa])` to your app.
You can access it just like `app.get()` or `app.post()` etc.

### route
The parameter `route` is a string and is required.
It can contain parameters like `:id`, `:year([0-9]{4})?` or `:action(view|edit)`.
It's basically just the same as a route you would pass to `app.get()`.

### target
The parameter `target` is a string and is required.
It can contain parameters like `:id`, `:year?` or `:action(view)`,
where a `?` marks an optional parameter and `(someString)` is a default value.  
The parameters get replaced by their respective counterparts in the `route`.

```javascript
app.redirect("/a/:id([0-9]+)?", "/b/:id(1)");
app.redirect("/c/:action(view|delete)?", "/d/:action?");
```
```
/a           -> /b/1
/a/100       -> /b/100
/c           -> /d
/c/view      -> /d/view
```

### status
The parameter `status` is an integer and is optional.
It is a [HTTP (redirection) status code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection).
It defaults to [`307` (Temporary Redirect)](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#307).

### method
The parameter `method` is a string and is optional.
It is a [VERB](http://expressjs.com/api.html#app.VERB) as in express' router.
It defaults to `all`.

### qsa
The parameter `qsa` is a boolean and is optional. It defaults to `false`.
If set to `true`, the query string will be appended. By default, it will be discarded.


## License 

(The MIT License)

Copyright (c) 20012-2013 Jan Buschtöns &lt;buschtoens@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
