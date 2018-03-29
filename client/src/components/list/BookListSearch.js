import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { searchBooks } from '../../actions/';

class BookListSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {term:''};
    }

    handleSearch() {
        this.props.searchBooks(this.state.term);
    }

    render() {
        return (
            <div className="form-group">
                <form onSubmit={(e) => e.preventDefault()} onChange={this.handleSearch.bind(this)}>
                    <input
                        placeholder="Search titles"
                        value={this.state.term}
                        onChange={event => this.setState({term: event.target.value})}
                        className="form-control"
                    />
                </form>
            </div>
        );
    }
}

export default connect(null, { searchBooks })(BookListSearch);
