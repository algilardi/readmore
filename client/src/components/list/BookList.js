import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectBook } from '../../actions';

import BookListSearch from './BookListSearch';
import BookListItem from './BookListItem';

class BookList extends Component {
    handleClick(book) {
        this.props.selectBook(book);
    }

    renderList() {
        if (this.props.books) {
            return this.props.books.map((book) => {
                return (
                    <li key={book.id} onClick={this.handleClick.bind(this, book)} className="list-group-item book-list-item">
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
            <div className="container card">
                <div className="card-body">
                    <BookListSearch />
                    <ul className="list-group list-group-flush">
                        {this.renderList()}
                    </ul>
                </div>
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

export default connect(mapStateToProps, { selectBook })(BookList);
