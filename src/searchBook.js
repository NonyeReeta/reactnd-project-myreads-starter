import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    queriedBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    query: "",
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.toLowerCase(),
    }));
    const searchPromise = BooksAPI.search(query);
    searchPromise.then((books) => {
      this.setState({
        queriedBooks: books,
      });
    });
  };
  updateShelf = (book) => (event) => {
    const shelf = event.target.value;
    book.shelf = shelf;
    this.setState((currentState) => ({
      shelf: book,
    }));
    BooksAPI.update(book, shelf);
    console.log(book);
  };
  render() {
    const { query, queriedBooks } = this.state;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            {query.length !== 0 && (
              <ol className="books-grid">
                {queriedBooks.map((book) => (
                  <li key={book.title}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks.thumbnail
                            })`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={this.updateShelf(book)}
                            defaultValue={"move"}
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>

                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
