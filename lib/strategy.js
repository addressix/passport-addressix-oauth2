// Load modules.
var OAuth2Strategy = require('passport-oauth2')
  , util = require('util')
  , uri = require('url')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError;

/**
 * `Strategy` constructor.
 *
 * The Addressix authentication strategy authenticates requests by delegating to
 * Addressix using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Addressix application's client id
 *   - `clientSecret`  your Addressix application's client secret
 *   - `callbackURL`   URL to which Addressix will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new AddressixStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/addressix/callback'
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.addressix.com/oauth2/v1/authorize';
  options.tokenURL = options.tokenURL || 'https://www.addressix.com/oauth2/v1/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'addressix';
  this._userProfileURL = options.userProfileURL || 'https://www.addressix.com/api/v1/people/me';    
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function (accessToken, done) {
    var self = this;
    this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
        if (err) return done(err);
        
        var json;
        
        try {
            json = JSON.parse(body);
        } catch (ex) {
            return done(new Error('Failed to parse user profile'));
            
        }
        
        
        var profile = json;
        done(null, profile);
    });
}

module.exports = Strategy;