import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CLEAR_ERRORS, UPDATE_USER} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state,
				error: '',
				authenticated: true,
				name: action.payload.name,
				email: action.payload.email,
				completed: action.payload.completed,
				reading: action.payload.reading,
				planToRead: action.payload.planToRead
			};
		case UNAUTH_USER:
			return { ...state, authenticated: false, name:'', email:''};
		case AUTH_ERROR:
			return {...state, error: action.payload };
		case CLEAR_ERRORS:
			return {...state, error:''};
		case UPDATE_USER:
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
	}

	return state;
}
