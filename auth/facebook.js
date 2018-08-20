var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
        clientID: "650492478678159",
        clientSecret: "1ae9ef296473b3ad474fb10163d0c6b1",
        callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            name: profile.displayName
        }, {
            name: profile.displayName,
            userid: profile.id
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            done(null, user);
        });
    }
));

module.exports = passport;