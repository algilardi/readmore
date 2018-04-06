import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CLEAR_ERRORS, UPDATE_USER, REMOVE_BOOK_FROM_STATE} from '../actions/types';
import { COMPLETED, READING, PLAN_TO_READ } from '../constants';

export default function(state = {}, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state,
				error: '',
				authenticated: true,
				name: action.payload.name,
				email: action.payload.email,
				completed: action.payload.completed || [],
				reading: action.payload.reading || [],
				planToRead: action.payload.planToRead || []
			};
		case UNAUTH_USER:
			window.location.reload();
			return { ...state, authenticated: false, name:'', email:''};
		case AUTH_ERROR:
			return {...state, error: action.payload };
		case CLEAR_ERRORS:
			return {...state, error:''};
		case UPDATE_USER:
			console.log(action.payload);
			let newBook = {
				title: action.payload.title,
				volumeID: action.payload.volumeID,
				rating: action.payload.rating
			};
			if (action.payload.status === 'completed')
				return {...state, completed: [newBook, ...state.completed]};
			if (action.payload.status === 'reading')
				return {...state, reading: [newBook, ...state.reading]};
			if (action.payload.status === 'planToRead')
				return {...state, planToRead: [newBook, ...state.planToRead]};
		case REMOVE_BOOK_FROM_STATE:
			let { activeList, volumeID } = action.payload;
			console.log('hello', action.payload);
			let index;
			if (activeList === COMPLETED) {
				index = state.completed.map(book => {return book.volumeID;}).indexOf(volumeID);
				return {...state, completed: [
					...state.completed.slice(0, index),
					...state.completed.slice(index+1)
				]};
			}
			if (activeList === READING) {
				index = state.reading.map(book => {return book.volumeID;}).indexOf(volumeID);
				return {...state, reading: [
					...state.reading.slice(0, index),
					...state.reading.slice(index+1)
				]};
			}
			if (activeList === PLAN_TO_READ) {
				index = state.planToRead.map(book => {return book.volumeID;}).indexOf(volumeID);
				return {...state, planToRead: [
					...state.planToRead.slice(0, index),
					...state.planToRead.slice(index+1)
				]};
			}
	}

	return state;
}
