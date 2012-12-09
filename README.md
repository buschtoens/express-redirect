# express-redirect [![Build Status](https://secure.travis-ci.org/silvinci/express-redirect.png?branch=master)](https://travis-ci.org/silvinci/express-redirect)

```javascript
// just a smple redirect
app.redirect("/p/:id", "/page/:id");

// you want it permanent?
app.redirect("/p/:id", "/page/:id", 301);

// no id, goto page # 1
app.redirect("/p/:id?", "/page/:id(1)");

// only redirect POST (for whatever reason)
app.redirect("/contact", "/thanks", "post")

// a bit more complex
app.redirect(
  "/entry/:entry/comments/:action(view|edit|delete)?/:id([0-9]+)/:reply([0-9]+)?",
  "/entry/:entry/comments/:action(view)/:id/:reply?"
);
```

**express-redirect** is *insanely* fast, as it precompiles and joins together everything it can.
Even very complex redirect rules don't take longer than 1 ms. It just comes down to concatenating strings.

---

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