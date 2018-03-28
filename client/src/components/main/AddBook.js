import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-modal';

import { addBook } from '../../actions';

Modal.setAppElement(document.querySelector('.mainContainer'));

class AddBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleFormSubmit(values) {
        values.email = this.props.email;
        values.volumeID = this.props.activeBook.id;
        values.title = this.props.activeBook.volumeInfo.title;
        this.props.addBook(values);
        this.closeModal();
    }

    render() {
        const { handleSubmit } = this.props;

        const modalComponent = (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="statusSelect">Status</label>
                    <div className="col-sm-9">
                        <Field name="status" id="statusSelect" component="select" className="form-control mt-0">
                            <option value="completed">Completed</option>
                            <option value="reading">Reading</option>
                            <option value="planToRead">Plan to Read</option>
                        </Field>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="ratingSelect">Rating</label>
                    <div className="col-sm-9">
                        <Field name="rating" id="ratingSelect" component="select" className="form-control mt-0">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="none">Rate Later</option>
                        </Field>
                    </div>
                </div>
                <p className="text-center"><button type="submit" className="btn btn-outline-primary">Submit</button></p>
            </form>
        );
        const modalStyle = {
            content : {
                margin: 'auto',
                width: '300px',
                height: '190px'
            }
        };

        if (this.props.authenticated) {
            // console.log('completed',this.props.completed);
            // console.log('reading',this.props.reading);
            // console.log('planToRead',this.props.planToRead);

            if (this.props.completed.map(book => {return book.volumeID;}).indexOf(this.props.activeBook.id) !== -1)
                return <div className="alert alert-secondary mb-0">You read this book</div>;
            if (this.props.reading.map(book => {return book.volumeID;}).indexOf(this.props.activeBook.id) !== -1)
                return <div className="alert alert-secondary mb-0">You are currently reading this book</div>;
            if (this.props.planToRead.map(book => {return book.volumeID;}).indexOf(this.props.activeBook.id) !== -1)
                return <div className="alert alert-secondary mb-0">You plan to read this book</div>;
            return (
                <div>
                    <button type="button"
                        onClick={this.openModal}
                        className="btn btn-outline-primary">
                        Log Book
                    </button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={modalStyle}
                        closeTimeoutMS={400}>
                        {modalComponent}
                    </Modal>
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        completed: state.auth.completed,
        reading: state.auth.reading,
        planToRead: state.auth.planToRead,
        email: state.auth.email,
        activeBook: state.book.activeBook
    };
}

export default reduxForm({
    form: 'addBook',
    initialValues: {
        status: 'completed',
        rating: '1'
    }
})(connect(mapStateToProps, { addBook })(AddBook));
