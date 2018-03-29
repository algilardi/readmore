import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectBook, generateImageLink } from '../../actions';

class BookListItem extends Component {
    render() {
        let { book } = this.props;
        let { title } = book.volumeInfo;

        let imgSrc = generateImageLink(book.volumeInfo);

        return (
                <div className="container-fluid">
                    <dl className="row">
                        <dt className="col-sm-3">
                            <img className="img-fluid" src={imgSrc}></img>
                        </dt>
                        <dd className="col-sm-9 text-truncate">{title}</dd>
                    </dl>
                </div>
        );
    }
}

export default connect(null, { generateImageLink })(BookListItem);
