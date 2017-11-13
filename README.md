A simple [Passport](http://passportjs.org/) strategy for Addressix OAuth2.

## Install

  npm install passport-addressix-oauth2

## Usage

Register the strategy

~~~javascript
var AddressixStrategy = require('passport-addressix-oauth2').Strategy;

passport.use(new AddressixStrategy({
  clientID: ADDRESSIX_CLIENT_KEY,
  clientSecret: ADDRESSIX_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/callback"
}, function(accessToken, refreshToken, profile, done) {
   User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
}));
~~~

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'addressix'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/someroute/example',
  passport.authenticate('addressix'));

app.get('/auth/example/callback',
  passport.authenticate('addressix', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Related Modules

- [passport-oauth2](https://github.com/jaredhanson/passport-oauth2) — OAuth 2.0 authentication strategy
- [passport-http-bearer](https://github.com/jaredhanson/passport-http-bearer) — Bearer token authentication strategy for APIs
- [OAuth2orize](https://github.com/jaredhanson/oauth2orize) — OAuth 2.0 authorization server toolkit

## License

[The MIT License](http://opensource.org/licenses/MIT)
