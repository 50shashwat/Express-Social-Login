var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var passportTwitter = require('../auth/twitter');
var passportGoogle = require('../auth/google');


/* LOGIN ROUTER */
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Please Sign In with:'
    });
});

/* LOGOUT ROUTER */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


/* FACEBOOK ROUTER */
router.get('/facebook',
    passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
    passportFacebook.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

/* TWITTER ROUTER */
router.get('/twitter',
    passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
    passportTwitter.authenticate('twitter', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

/* GOOGLE ROUTER */
router.get('/google',
    passportGoogle.authenticate('google', {
        scope: 'https://www.google.com/m8/feeds'
    }));

router.get('/google/callback',
    passportGoogle.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.redirect('/');
    });


module.exports = router;