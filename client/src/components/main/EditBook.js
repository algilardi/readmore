import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-modal';

import { removeBookFromState, updateBook } from '../../actions';

Modal.setAppElement(document.querySelector('.mainContainer'));

class EditBook extends Component {
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
      this.props.removeBookFromState(this.props.book, this.props.activeList);
      this.props.updateBook(this.props.book, this.props.email, values.status, values.rating, this.props.activeList, this.props.book.rating);
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
              <p className="text-center"><button type="submit" className="btn btn-outline-primary">Update</button></p>
          </form>
      );
      const modalStyle = {
          content : {
              margin: 'auto',
              width: '300px',
              height: '190px'
          }
      };

      return (
          <div>
              <button type="button"
                  onClick={this.openModal}
                  className="btn btn-outline-primary">
                  Edit
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
}

function mapStateToProps(state) {
    return {
        completed: state.auth.completed,
        reading: state.auth.reading,
        planToRead: state.auth.planToRead,
        email: state.auth.email
    };
}

export default reduxForm({
    form: 'editBook',
    initialValues: {
        status: 'completed',
        rating: '1'
    }
})(connect(mapStateToProps, { removeBookFromState, updateBook })(EditBook));
