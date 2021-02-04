const passport = require('passport');
const passportJWT = require("passport-jwt");
const Strategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('../models');
const keys = require("./keys");

// Local Strategy
passport.use(new Strategy(
    { 
        usernameField: "email", 
        passwordField: "password" 
    },
    (username, password, done) => {

        db.User.findOne({ email: username }, (err, user) => {
            // If any error
            if (err) { return done(err) }
            if (!user) {
                return done(null, false, {
                    message: 'No user found.'
                })
            }
            user.login(password).then((res) => {
                console.log(res)
                if (res)
                return done(null, user)
                return done(err, false, {
                    message: 'Password not matched.'
                })
            }).catch((err) => {
                console.log(err)
            })
        })
    }
));

// JWT
passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.secretOrKey
    }, 
    (jwt_payload, done) => {
        db.User.findById(jwt_payload.id).then(user => {
            return done(null, user)
        }).catch(err => {
            return done(err, false, {
                message: 'Token not matched.'
            })
        })
    }
));

module.exports = passport;