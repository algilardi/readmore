import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';

class Register extends Component {
	handleFormSubmit(values) {
		console.log(values);
		this.props.registerUser(values, this.props.closeModal);
	}


	renderField(field) {
		return (
			<div className="form-group">
				<input
					className="form-control"
					type={field.type}
					placeholder={field.placeholder}
					{...field.input}
				/>
			</div>
		);
	}

	renderAlert() {
		let visibility = this.props.errorMessage ? "visible" : "hidden";
			return (
				<div className="alert alert-danger" style={{visibility}}>
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<Field
					placeholder="Email"
					name="email"
					type="text"
					component={this.renderField}
				/>
				<Field
					placeholder="Name"
					name="name"
					type="text"
					component={this.renderField}
				/>
				<Field
					placeholder="Password"
					name="password"
					type="password"
					component={this.renderField}
				/>
				<Field
					placeholder="Confirm Password"
					name="confirmPassword"
					type="password"
					component={this.renderField}
				/>
				{this.renderAlert()}
				<p className="text-center"><button type="submit" className="btn btn-outline-primary">Register</button></p>
			</form>
		);
	}
}

// Doesn't work as nicely with react-modal
/*
function validate(values) {
	const errors = {};

	if (!values.email || !emailRe.test(values.email)) {
		errors.email = "Enter a valid email";
	}
	if (!values.name) {
		errors.name = "Enter your name";
	}
	if (!values.password) {
		errors.password = "Enter a password";
	}
	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Passwords do not match!";
	}

	return errors;
}
*/
function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'register'
})(connect(mapStateToProps, { registerUser })(Register));
