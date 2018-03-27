import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../actions';

class Login extends Component {
	handleFormSubmit({ email, password }) {
		if (!this.props.errorMessage) {
			this.props.loginUser({email, password}, this.props.closeModal);
		}
	}

	renderField(field) {
		return (
			<div className="form-group">
				<input
					className="form-control form-control-danger"
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
					placeholder="Password"
					name="password"
					type="password"
					component={this.renderField}
				/>
				{this.renderAlert()}
				<p className="text-center"><button type="submit" className="btn btn-outline-primary">Log in</button></p>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
		form: 'LoginForm'
})(
	connect(mapStateToProps, { loginUser })(Login)
);
