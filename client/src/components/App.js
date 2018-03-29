import React, { Component } from 'react';

import UserHeader from './UserHeader';
import BookList from './list/BookList';
import MainView from './MainView';

class App extends Component {
    render() {
        return (
            <div>
                <UserHeader />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <MainView />
                        </div>
                        <div className="col-md-5 mb-2">
                            <BookList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
