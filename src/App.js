import React, { Component } from "react";
import "./App.css";
import CurrentlyReading from "./currentlyReading";
import Read from "./read";
import WantToRead from "./wantToRead";
import { Link } from "react-router-dom";

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <CurrentlyReading />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <WantToRead />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <Read />
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/searchBooks">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
