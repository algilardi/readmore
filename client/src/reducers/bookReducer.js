import { BOOK_SEARCH, BOOK_EMPTY, BOOK_ERROR, BOOK_SELECT, BOOK_SELECT_API,
        ABOUT, TOPLIST, USER_PAGE } from '../actions/types';
import { BOOK_STATE, TOP_STATE, USER_STATE, ABOUT_STATE } from '../constants';

export default function(state = {mainViewState: TOP_STATE}, action) {
    switch (action.type) {
        case BOOK_SEARCH:
            return {...state, books: action.payload, searchedYet: true};
        case BOOK_EMPTY:
            return {...state, books: undefined, searchedYet: false};
        case BOOK_ERROR:
            return {...state, books: undefined, activeBook: null, searchedYet: true, mainViewState: null};
        case BOOK_SELECT:
            return {...state, activeBook: action.payload, mainViewState: BOOK_STATE};
        case BOOK_SELECT_API:
            return {...state, activeBook: action.payload, mainViewState: BOOK_STATE};
        case ABOUT:
            return {...state, mainViewState: ABOUT_STATE};
        case TOPLIST:
            return {
                ...state, mainViewState: TOP_STATE,
                highestRatedBooks: action.payload.highestRatedBooks,
                mostPopularBooks: action.payload.mostPopularBooks
            };
        case USER_PAGE:
            return {...state, mainViewState: USER_STATE};
    }

    return state;
}
