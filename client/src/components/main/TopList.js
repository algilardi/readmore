import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderTopList, selectBookAPI } from '../../actions';
import { HIGHEST, POPULAR } from '../../constants';

class TopList extends Component {
    constructor(props) {
        super(props);

        this.state = {listType: HIGHEST, book: null};
    }

    componentWillMount() {
        if (!this.props.highestRatedBooks)
            this.props.renderTopList();
    }

    trClick(book) {
        this.props.selectBookAPI(book);
    }

    renderTbody(highest) {
        let books = highest ? this.props.highestRatedBooks : this.props.mostPopularBooks;
        return books.map(book => {
            return (
                <tr onClick={this.trClick.bind(this, book)} className="book-tr" key={book.volumeID}>
                    <td >{book.title}</td>
                    {highest ? <td>{book.avgRating} / 5</td> : <td>{book.totalUsers}</td>}
                </tr>
            );
        });
    }

    renderButton(highest) {
        if (highest) {
            return (
                <button
                    className="col btn btn-link text-right"
                    onClick={this.mostPopularClick.bind(this)}>
                    Show Most Popular
                </button>
            );
        }
        else {
            return (
                <button
                    className="col btn btn-link text-right"
                    onClick={this.highestRatedClick.bind(this)}>
                    Show Highest Rated
                </button>
            );
        }
    }

    highestRatedClick() {
        this.setState({listType: HIGHEST});
    }

    mostPopularClick() {
        this.setState({listType: POPULAR});
    }

    render() {
        let highest = this.state.listType === HIGHEST ? true : false;

        if (this.props.highestRatedBooks && this.props.mostPopularBooks) {
            return (
                <div className="container card">
                        <div className="card-body">
                            <div className="row">
                                <h4 className="text-center ml-3">{this.state.listType} Books</h4>
                                {this.renderButton(highest)}
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        {highest ? <th scope="col">Rating</th> : <th scope="col">Users</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTbody(highest)}
                                </tbody>
                            </table>
                        </div>
                </div>

            );
        }
        else
            return <h3>Loading...</h3>;
    }
}

function mapStateToProps(state) {
    return {
        highestRatedBooks: state.book.highestRatedBooks,
        mostPopularBooks: state.book.mostPopularBooks
    };
}

export default connect(mapStateToProps, { renderTopList, selectBookAPI })(TopList);
