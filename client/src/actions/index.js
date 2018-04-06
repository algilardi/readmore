import axios from 'axios';

import placeholderImg from '../images/book-placeholder.jpg';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, CLEAR_ERRORS, UPDATE_USER, REMOVE_BOOK_FROM_STATE,
		ABOUT, TOPLIST, USER_PAGE,
		BOOK_SEARCH, BOOK_EMPTY, BOOK_ERROR, BOOK_SELECT, BOOK_SELECT_API} from './types';

import { COMPLETED, READING, PLAN_TO_READ } from '../constants';


const API_URL = 'http://localhost:3090';
const BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAj3oBqPRNQZCJSuOQVb8195Y3tnA62W-0';

// User Auth
// Log's in user and sets token
export function loginUser({ email, password }, callback) {
	return function(dispatch) {
		// Submit email/pass to server
		axios.post(`${API_URL}/login`, { email, password })
			.then(response => {
				// If req is good:
				// - update state
				dispatch({
					type: AUTH_USER,
					payload: response.data
				});
				// - save JWT token
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('email', response.data.email);
				callback();
			})
			.catch(() => {
				// If req is bad, show err to user
				dispatch({type: AUTH_ERROR, payload: "Bad Login!"});
			});
	};
}

// Registers user and sets token
export function registerUser({ email, name, password, confirmPassword }, callback) {
	return function(dispatch) {
		axios.post(`${API_URL}/register`, { email, name, password, confirmPassword })
		.then(response => {
			dispatch({
				type: AUTH_USER,
			 	payload: response.data
			});
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('email', response.data.email);
			callback();
		})
		.catch( ({response}) => {
			dispatch({type: AUTH_ERROR, payload: response.data.error});
		});
	};
}

// Removes logged in token
export function logoutUser() {
	localStorage.removeItem('token');
	localStorage.removeItem('email');
	return { type: UNAUTH_USER };
}

// Clears login errors after subsequent attempts
export function clearErrors() {
	return { type: CLEAR_ERRORS };
}

// Book Display
export function searchBooks (term = '') {
	if (term === '') {
		return { type: BOOK_EMPTY };
	}

	let terms = term.replace(/ /g, '+');
	return function(dispatch) {
		axios.get(`${BOOKS_URL}?q=${terms}&key=${API_KEY}&limit=10&printType=books&langRestrict=en&filter=ebooks`)
		.then(response => {
			dispatch({
				type: BOOK_SEARCH,
				payload: response.data.items
			});
		})
		.catch( ({response}) => {
			dispatch({type: BOOK_ERROR});
		});
	};
}

export function selectBook(book){
	console.log('book selected', book);
	return { type: BOOK_SELECT, payload: book };
}

// Select book version used for clicking on a book in top/user list
export function selectBookAPI(book) {
	const {volumeID} = book;
	return function(dispatch) {
		axios.get(`${BOOKS_URL}/${volumeID}?key=${API_KEY}`)
		.then(response => {
			console.log(response);
			dispatch({
				type: BOOK_SELECT_API,
				payload: response.data
			});
		})
		.catch( ({response}) => {
			dispatch({type: BOOK_ERROR});
		});
	};
}

// Book DB Handling
export function addBook({ volumeID, title, email, status, rating }) {
	axios.post(`${API_URL}/addBook`, { volumeID, title, email, status, rating });
	return {type: UPDATE_USER, payload: {status, volumeID, title, rating}};
}

export function updateBook({ volumeID, title}, email, status, rating, activeList, oldRating) {
	axios.post(`${API_URL}/updateBook`, { volumeID, title, email, status, rating, activeList, oldRating } );
	return {type: UPDATE_USER, payload: {status, volumeID, title, rating}};
}

export function deleteBook({volumeID, title}, email, activeList, rating) {
	axios.post(`${API_URL}/deleteBook`, { volumeID, title, email, activeList, rating } );
	return {type: REMOVE_BOOK_FROM_STATE, payload: {
		volumeID: volumeID,
		activeList: activeList
	}};
}

// Used for when book is edited and needs to be removed before being readded in UPDATE_USER
export function removeBookFromState({volumeID}, activeList) {
	return {type: REMOVE_BOOK_FROM_STATE, payload: {
		volumeID: volumeID,
		activeList: activeList
	}};
}

// View State Changing
export function renderAbout() {
	return { type: ABOUT};
}

export function renderTopList() {
	return function(dispatch) {
		axios.get(`${API_URL}/getTopBooks`)
		.then(response => {
			dispatch({
				type: TOPLIST,
				payload: response.data
			});
		})
		.catch( ({response}) => {
			dispatch({type: BOOK_ERROR});
		});
	};
}

export function renderUserPage() {
	return { type: USER_PAGE };
}

// Helper Functions
export function generateImageLink(book, size) {
	let { imageLinks } = book;
	let img = placeholderImg;

	if (imageLinks) {
		let { thumbnail } = imageLinks;
		img = thumbnail ? thumbnail : placeholderImg;
	}

	return img;
}
