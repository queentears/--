const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/user');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports = passport=>{
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
       console.log(jwt_payload);
    }));

}