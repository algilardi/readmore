import axios from 'axios';
import books from 'google-books-search-2';

import placeholderImg from '../images/book-placeholder.jpg';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, CLEAR_ERRORS,
		ABOUT, TOPLIST,
		BOOK_SEARCH, BOOK_EMPTY, BOOK_ERROR, BOOK_SELECT} from './types';

import { SIZE_LARGE } from '../constants';

const API_URL = 'http://localhost:3090';
const BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_KEY = 'AIzaSyAj3oBqPRNQZCJSuOQVb8195Y3tnA62W-0';

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
				callback();
			})
			.catch(() => {
				// If req is bad, show err to user
				dispatch({type: AUTH_ERROR, payload: "Bad Login!"});
			});
	};
}

export function registerUser({ email, name, password, confirmPassword }, callback) {
	return function(dispatch) {
		axios.post(`${API_URL}/register`, { email, name, password, confirmPassword })
		.then(response => {
			dispatch({
				type: AUTH_USER,
			 	payload: response.data
			});
			localStorage.setItem('token', response.data.token);
			callback();
		})
		.catch( ({response}) => {
			dispatch({type: AUTH_ERROR, payload: response.data.error});
		});
	};
}

export function logoutUser() {
	localStorage.removeItem('token');
	return { type: UNAUTH_USER };
}

export function clearErrors() {
	return { type: CLEAR_ERRORS };
}

export function renderAbout() {
	return { type: ABOUT};
}

export function renderTopList() {
	return { type: TOPLIST };
}

export function generateImageLink(book, size) {
	let { imageLinks } = book;
	let img = placeholderImg;

	if (imageLinks) {
		let {smallThumbnail, thumbnail} = imageLinks;
		img = smallThumbnail ? smallThumbnail : thumbnail ? thumbnail : placeholderImg;
	}

	return img;
}

export function searchBooks (term = '') {
	if (term === '') {
		return { type: BOOK_EMPTY };
	}

	let terms = term.replace(/ /g, '+');
	return function(dispatch) {
		axios.get(`${BOOKS_URL}${terms}&key=${API_KEY}&limit=10&printType=books&langRestrict=en`)
		.then((response) => {
			dispatch({
				type: BOOK_SEARCH,
				payload: response.data.items
			});
		})
		.catch( ({response}) => {
			dispatch({type: BOOK_ERROR, payload: response.data.error});
		});
	};
}

export function selectBook(book){
	return { type: BOOK_SELECT, payload: book };
}
