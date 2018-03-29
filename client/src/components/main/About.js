import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="container card">
                <div className="card-body">
                    <h4>FAQ</h4>
                    <hr />
                        <h6 className="lead">What is this?</h6>
                        <ul><li>A site for people trying to read more (the title kind of gives it away). So far you can look up and log books you've read, are reading, or are planning to read, but more features are in the works. Use it. Reading is good.</li></ul>
                        <h6 className="lead">Why are the search results weird?</h6>
                        <ul><li>This site uses the Google Books API, which can have some weird relevancy when searching. I agree, I think the first 7 results when searching "Harry Potter" should be the 7 Harry Potter books. But hey, nobody is perfect.</li></ul>
                        <h6 className="lead">I found a bug/Something weird happened/The site crashed</h6>
                        <ul><li>Those aren't questions, but if you could <a href="mailto:algilardi95@gmail.com" target="_blank">let me know</a> that would be cool. As far as I've tested, the main functionality should be bug-free.</li></ul>
                    <h4>Planned Features</h4>
                    <hr />
                    <ul >
                        <li className="">Nicer mobile layout</li>
                        <li className="">Login/Registration through Facebook/Google</li>
                        <li className="">More robust user profiles, and the ability to edit user information</li>
                        <li className="">Ability to add dates starting/finishing a book, in order to track more information (books finished in a year, pages read per month/year, etc)</li>
                        <li className="">Book purchasing links</li>
                    </ul>
                    <hr />
                    <h4>About</h4>
                        <ul>
                            <li>Made by <a href="https://algilardi.github.io">this guy</a></li>
                            <li>Current Version: v0.1 (lol)</li>
                        </ul>
                </div>
            </div>
        );
    }
}

export default About;
