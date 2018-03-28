import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookView from './main/BookView';
import TopList from './main/TopList';
import About from './main/About';
import UserPage from './main/UserPage';

import { BOOK_STATE, TOP_STATE, USER_STATE, ABOUT_STATE } from '../constants';

class MainView extends Component {
	render() {
		if (this.props.mainViewState === BOOK_STATE) {
			return <BookView />;
		}
		else if (this.props.mainViewState === ABOUT_STATE) {
			return <About />;
		}
		else if (this.props.mainViewState === TOP_STATE){
			return <TopList />;
		}
		else if (this.props.mainViewState === USER_STATE) {
			return <UserPage />;
		}
		else {
			return (
				<div className="container alert alert-danger">
					<h3 className="danger">Uh Oh!</h3>
					<p>Something went wrong, try refreshing the page</p>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		activeBook: state.book.activeBook,
		mainViewState: state.book.mainViewState
	};
}

export default connect(mapStateToProps)(MainView);
