import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookView from './main/BookView';
import TopList from './main/TopList';
import About from './main/About';

class MainView extends Component {
	render() {
		if (this.props.activeBook) {
			return <BookView />;
		}
		else if (this.props.about) {
			return <About />;
		}
		else {
			return <TopList />;
		}
	}
}

function mapStateToProps(state) {
	return {
		activeBook: state.book.activeBook,
		about: state.book.about
	};
}

export default connect(mapStateToProps)(MainView);
