import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class AddBook extends Component {
    render() {
        return (
            <button type="button" className="btn btn-outline-primary mb-4">Log Book</button>
        );
    }
}

export default AddBook;
