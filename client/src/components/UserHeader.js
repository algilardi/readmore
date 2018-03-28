import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { clearErrors, logoutUser, renderAbout, renderTopList, renderUserPage } from '../actions';

import Login from './auth/Login';
import Register from './auth/Register';

Modal.setAppElement(document.querySelector('.mainContainer'));

class UserHeader extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			modalType: 'login'
		};

		this.openLoginModal = this.openLoginModal.bind(this);
		this.openRegisterModal = this.openRegisterModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openLoginModal() {
		this.setState({modalIsOpen: true, modalType: 'login'});
	}

	openRegisterModal() {
		this.setState({modalIsOpen: true, modalType: 'register'});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
		setTimeout(() => {
			this.props.clearErrors();
		}, 500);
	}


	renderLinks() {
		if (this.props.authenticated) {
			return [
				<li className="nav-item" key={0}>
					<span className="navbar-text mr-4">Hi, <span className="user-link">{this.props.name}</span></span>
				</li>,
				<li className="nav-item" key={1}>
					<button className="btn btn-link" onClick={this.props.logoutUser}>Log Out</button>
				</li>
			];
		}
		else {
			return [
				<li className="nav-item" key={0}>
					<button className="btn btn-link" onClick={this.openLoginModal}>Log In</button>
				</li>,
				<li className="nav-item" key={1}>
					<button className="btn btn-link" onClick={this.openRegisterModal}>Register</button>
				</li>
			];
		}
	}

	render() {
		let modalComponent, modalStyle;
		if (this.state.modalType === 'register') {
			modalComponent = <Register closeModal={this.closeModal}/>;
			modalStyle = {
				content : {
					margin: 'auto',
					width: '300px',
					height: '360px'
				}
			};
		}
		else {
			modalComponent = <Login closeModal={this.closeModal}/>;
			modalStyle = {
				content : {
					margin: 'auto',
					width: '300px',
					height: '250px'
				}
			};
		}

		let userPageLink = this.props.authenticated ? <li className="btn btn-link" onClick={this.props.renderUserPage}>My Books</li> : '';



		return (
			<div>
				<nav className="navbar navbar-expand-sm navbar-light bg-light-blue m-3">
					<a href="/" className="navbar-brand"><h3>ReadMore</h3></a>
					<div className="navbar navbar-collapse">
						<ul className="navbar-nav ml-auto">
							<li className="btn btn-link" onClick={this.props.renderTopList}>Top Books</li>
							{userPageLink}
							<li className="btn btn-link" onClick={this.props.renderAbout}>About</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							{this.renderLinks()}
						</ul>
					</div>
				</nav>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={modalStyle}
					closeTimeoutMS={400}
					> {modalComponent}
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		name: state.auth.name,
		email: state.auth.email,
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, { clearErrors, logoutUser, renderAbout, renderTopList, renderUserPage })(UserHeader);
