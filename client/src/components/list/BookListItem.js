import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectBook, generateImageLink } from '../../actions';

class BookListItem extends Component {
    handleClick() {
        this.props.selectBook(this.props.book);
    }

    render() {
        let { book } = this.props;
        let { title } = book.volumeInfo;
        // if (title.length > 40)
        // title = title.substring(0, 40) + '...';

        let imgSrc = generateImageLink(book.volumeInfo);

        return (
                <div className="container-fluid" onClick={this.handleClick.bind(this)}>
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

export default connect(null, { selectBook, generateImageLink })(BookListItem);
