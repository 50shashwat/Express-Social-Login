var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

passport.use(new GoogleStrategy({
        clientID: "574862751467-7j7vf18hos2v82qguro1cr80lofhbr5r.apps.googleusercontent.com",
        clientSecret: "7OoXY5lt5Y83RQbwnlcpD69L",
        callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            userid: profile.id
        }, {
            name: profile.displayName,
            userid: profile.id
        }, function (err, user) {
            return done(err, user);
        });
    }
));

module.exports = passport;