const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	// Verify username and pass, call done with user
	User.findOne({ email: email }, (err, user) => {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		// compare passwords
		user.comparePassword(password, (err, isMatch) => {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }

			return done(null, user);
		});
	});
});

// setup JWT strategy config
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	// if user ID exists in payload, call done with it
	User.findById(payload.sub, (err, user) => {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		}
		else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);
