const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.login = (req, res, next) => {
	// user already authed, signin and give token
	res.send({
		token: tokenForUser(req.user),
		name: req.user.name,
		email: req.user.email,
	 	completed: req.user.completed || [],
		reading: req.user.reading || [],
		planToRead: req.user.planToRead || []
	});
};

exports.register = (req, res, next) => {
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	// Check if user exists
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) { return next(err); }

		// If user does not exist, return error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is already in use'});
		}
		if (!email || !name || !password) {
			return res.status(422).send({error: 'Please fill out all fields'});
		}
		if (!emailRe.test(email)) {
			return res.status(422).send({ error: 'Invalid email'});
		}
		if (password !== confirmPassword) {
			return res.status(422).send({ error: 'Password mismatch'});
		}

		// Otherwise create and save user record in DB
		const newUser = new User({
			email: email,
			name: name,
			password: password,
			completed: [],
			reading: [],
			planToRead: []
		});

		newUser.save( err => {
			if (err) { return next(err); }

			res.send({ token: tokenForUser(newUser), name: name, email: email });
		});
	});
};

exports.getData = (req, res, next) => {
	const email = req.query.email;
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) {return next(err);}

		res.send(existingUser);
	});
};
