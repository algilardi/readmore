import React, { Component } from 'react';
import { connect } from 'react-redux';

import { generateImageLink } from '../../actions';

import AddBook from './AddBook';

class BookView extends Component {
    render() {
        let book = this.props.activeBook.volumeInfo;
        let imgSrc = generateImageLink(book);

        let authors = book.authors ? 'by ' + book.authors.reduce((str, author) => {return str += ', ' + author;}) : 'No author information';
        let categories = book.categories ? book.categories.reduce((str, category) => {return str+= ', ', category;}) : 'No data found';
        let year = book.publishedDate ? book.publishedDate.substring(0,4) : 'No data found';
        let length = book.pageCount ? book.pageCount + ' pages' : 'No data found';
        let purchase = '';
        if (this.props.activeBook.saleInfo && this.props.activeBook.saleInfo.buyLink)
            purchase = <a href={this.props.activeBook.saleInfo.buyLink} target="_blank" className="btn btn-outline-primary mb-4">Purchase eBook</a>;
;
        let dbTitle = book.subtitle ? book.title + ' ' + book.subtitle : book.title ;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <img className="img-fluid img-main" src={imgSrc}></img>
                    </div>
                    <div className="col-sm-8">
                        <AddBook title={dbTitle}/> {purchase}
                        <h4>{book.title}</h4>
                        <h5 className="text-muted">{book.subtitle}</h5>
                        <span className="pt-2">{authors}</span>
                        <dl className="row mt-4">
                            <dt className="col-sm-3">Categories</dt>
                            <dl className="col-sm-9">{categories}</dl>
                            <dt className="col-sm-3">Year</dt>
                            <dl className="col-sm-9">{year}</dl>
                            <dt className="col-sm-3">Length</dt>
                            <dl className="col-sm-9">{length}</dl>
                        </dl>
                    </div>
                </div>
                <div className="row mt-3">
                    <p className="lead">{book.description}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        activeBook: state.book.activeBook
    };
}

export default connect(mapStateToProps, { generateImageLink })(BookView);
