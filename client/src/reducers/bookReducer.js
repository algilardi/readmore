import { BOOK_SEARCH, BOOK_EMPTY, BOOK_ERROR, BOOK_SELECT,
        ABOUT, TOPLIST } from '../actions/types';
import { BOOK_STATE, TOP_STATE, USER_STATE } from '../constants';

export default function(state = {}, action) {
    switch (action.type) {
        case BOOK_SEARCH:
            return {...state, books: action.payload, searchedYet: true};
        case BOOK_EMPTY:
            return {...state, books: undefined, searchedYet: false};
        case BOOK_ERROR:
            return {...state, books: undefined, activeBook: null, searchedYet: true};
        case BOOK_SELECT:
            return {...state, activeBook: action.payload};
        case ABOUT:
            return {...state, activeBook: undefined, about: true};
        case TOPLIST:
            return {...state, activeBook: undefined, about: false};
    }

    return state;
}
