# express-redirect [![Build Status](https://secure.travis-ci.org/silvinci/express-redirect.png?branch=master)](https://travis-ci.org/silvinci/express-redirect)

```javascript
// just a smple redirect
app.redirect("/p/:id", "/page/:id");

// you want it permanent?
app.redirect("/p/:id", "/page/:id", 301);

// no id, goto page # 1
app.redirect("/p/:id?", "/page/:id(1)");

// a bit more complex
app.redirect(
  "/entry/:entry/comments/:action?/:id([0-9]+)/:reply([0-9]+)?",
  "/entry/:entry/comments/:action(view)/:id/:reply?"
);
```