const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	name: String,
	password: String
});

// encrypt password
// before saving a model, run this
userSchema.pre('save', function(next) {
	// get access to instance of user model
	const user = this;

	// generate salt then run callback
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }

		// hash (encrypt) password with salt
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) { return next(err); }

			// overwrite plain text password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) { return callback(err); }

		callback(null, isMatch);
	});
};

module.exports = mongoose.model('user', userSchema);
