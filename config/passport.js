const passport = require('passport');
const passportJWT = require("passport-jwt");
const Strategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('../models');
const keys = require("./keys");

const development = false;

// Local Strategy
passport.use(new Strategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    (username, password, done) => {

        if (!development) {
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
        } else {
            return done(null, { "_id": "60190a22bc84d55830984260", "name": "Mark Wilson", "email": "markwilson107@hotmail.com", "password": "$2a$10$wqAhTy5PxWIkaqSheZyjzOkNVeYciqAkbneB7c7svrDs.wFwAKfLm", "date": { "$date": { "$numberLong": "1612253730780" } }, "__v": { "$numberInt": "0" } })
        }
    }
));

// JWT
passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.secretOrKey
    },
    (jwt_payload, done) => {
        if (!development) {
            db.User.findById(jwt_payload.id).then(user => {
                return done(null, user)
            }).catch(err => {
                return done(err, false, {
                    message: 'Token not matched.'
                })
            })
        } else {
            return done(null, { "_id": "60190a22bc84d55830984260", "name": "Mark Wilson", "email": "markwilson107@hotmail.com", "password": "$2a$10$wqAhTy5PxWIkaqSheZyjzOkNVeYciqAkbneB7c7svrDs.wFwAKfLm", "date": { "$date": { "$numberLong": "1612253730780" } }, "__v": { "$numberInt": "0" } })
        }
    }
));

module.exports = passport;