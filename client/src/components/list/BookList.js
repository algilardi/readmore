import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookListSearch from './BookListSearch';
import BookListItem from './BookListItem';

class BookList extends Component {
    renderList() {
        if (this.props.books) {
            return this.props.books.map((book) => {
                return (
                    <li key={book.id} className="list-group-item book-list-item">
                        <BookListItem book={book} />
                    </li>
                );
            });
        }
        else {
            const emptyBooksString = this.props.searchedYet ? 'No books found!' : '';
            return <li className="list-group-item">{emptyBooksString}</li>;
        }
    }

    render() {
        return (
            <div className="container">
                <BookListSearch />
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.book.books,
        searchedYet: state.book.searchedYet
    };
}

export default connect(mapStateToProps)(BookList);
