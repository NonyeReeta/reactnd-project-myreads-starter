import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  render() {
    const { books } = this.props;
    return (
      <ol className="books-grid">
        {books === "undefined" && <li />}

        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: book.imageLinks
                      ? `url(${book.imageLinks.thumbnail})`
                      : "",
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    onChange={this.props.onAdd(book)}
                    defaultValue={book.shelf}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>

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
    );
  }
}

export default Book;
