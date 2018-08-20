var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');

passport.serializeUser(function (user, fn) {
    fn(null, user);
});

passport.deserializeUser(function (id, fn) {
    User.findOne({
        _id: id.doc._id
    }, function (err, user) {
        fn(err, user);
    });
});

passport.use(new TwitterStrategy({
        consumerKey: "oUt6G5Xl5pNEgu6NV3407fmXd",
        consumerSecret: "frYWSDPE3KrY5MJZsjopKsowsOPdUJoNP4BRJj1BeMvTHOHIkm",
        callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            name: profile.displayName
        }, {
            name: profile.displayName,
            userid: profile.id
        }, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            done(null, user);
        });
    }
));

module.exports = passport;