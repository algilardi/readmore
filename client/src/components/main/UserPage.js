import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectBookAPI } from '../../actions';
import { COMPLETED, READING, PLAN_TO_READ } from '../../constants';

import EditBook from './EditBook';

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeList: COMPLETED,
            completedBtnClass: 'btn-outline-primary btn-user-category',
            readingBtnClass: 'btn-link',
            planToReadBtnClass: 'btn-link'
        };
    }

    completedClick(){
        if(this.state.activeList !== COMPLETED){
            this.setState({
                activeList: COMPLETED,
                completedBtnClass: 'btn-outline-primary btn-user-category',
                readingBtnClass: 'btn-link',
                planToReadBtnClass: 'btn-link'
            });
        }
    }

    readingClick(){
        if(this.state.activeList !== READING){
            this.setState({
                activeList: READING,
                completedBtnClass: 'btn-link',
                readingBtnClass: 'btn-outline-primary btn-user-category',
                planToReadBtnClass: 'btn-link'
            });
        }
    }

    planToReadClick(){
        if(this.state.activeList !== PLAN_TO_READ){
            this.setState({
                activeList: PLAN_TO_READ,
                completedBtnClass: 'btn-link',
                readingBtnClass: 'btn-link',
                planToReadBtnClass: 'btn-outline-primary btn-user-category'
            });
        }
    }

    trClick(book) {
        this.props.selectBookAPI(book);
    }

    renderTbody(){
        let {completed, reading, planToRead} = this.props;

        let books;
        if (this.state.activeList === COMPLETED)
            books = completed;
        else if (this.state.activeList === READING)
            books = reading;
        else
            books = planToRead;

        return books.map(book => {
            return (
                <tr onClick={this.trClick.bind(this, book)} className="book-tr" key={book.volumeID}>
                    <td>{book.title}</td>
                    <td>{book.rating}</td>
                    <td onClick={e => e.stopPropagation()}><EditBook book={book} activeList={this.state.activeList}/></td>
                </tr>
            );
        });
    }

    render() {
        let {completed, reading, planToRead} = this.props;
        let booksRead = completed.length + reading.length + planToRead.length;

        let completedBtn = `col btn ${this.state.completedBtnClass}`;
        let readingBtn = `col btn ${this.state.readingBtnClass}`;
        let planToReadBtn = `col btn ${this.state.planToReadBtnClass}`;

        if (this.props.authenticated) {
            return (
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h4>{this.props.name}</h4>
                            <span className="text-secondary">{this.props.email}</span><br></br>
                            <span className="text-secondary">Books: {booksRead}</span><br></br>
                            <span className="text-secondary"> (Completed: {completed.length}, Reading: {reading.length}, Planned: {planToRead.length})</span>
                        </div>
                    </div>
                    <div className="card mt-2">
                        <div className="card-body">
                            <div className="row pt-0 mt-0">
                                <button className={completedBtn} onClick={this.completedClick.bind(this)}>Completed</button>
                                <button className={readingBtn} onClick={this.readingClick.bind(this)}>Reading</button>
                                <button className={planToReadBtn} onClick={this.planToReadClick.bind(this)}>Plan to Read</button>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTbody()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
        return <div></div>;
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        name: state.auth.name,
        email: state.auth.email,
        completed: state.auth.completed,
        reading: state.auth.reading,
        planToRead: state.auth.planToRead
    };
}

export default connect(mapStateToProps, { selectBookAPI })(UserPage);
