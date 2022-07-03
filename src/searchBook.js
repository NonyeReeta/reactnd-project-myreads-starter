import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    query: "",
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.map((book) => (book.shelf = "None"));
      this.setState(() => ({
        books,
      }));
    });
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));
  };
  updateShelf = (book) => (event) => {
    const shelf = event.target.value;
    book.shelf = shelf;
    this.setState((currentState) => ({
      shelf: book,
    }));
    BooksAPI.update(book, shelf);
  };
  render() {
    const { query, books } = this.state;
    const queriedBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

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
            <ol className="books-grid">
              {queriedBooks.map((queriedBook) => (
                <li key={queriedBook.title}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            queriedBook.imageLinks.thumbnail
                          })`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          onChange={this.updateShelf(queriedBook)}
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
                    <div className="book-title">{queriedBook.title}</div>
                    <div className="book-authors">
                      {queriedBook.authors.join(", ")}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
