import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class WantToRead extends Component {
  state = {
    wantToRead: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const lib = books.filter((book) => book.shelf === "wantToRead");
      this.setState(() => ({
        wantToRead: lib,
        isLoading: false,
      }));
    });
  }
  updateShelf = (book) => (event) => {
    const shelf = event.target.value;
    book.shelf = shelf;
    BooksAPI.update(book, shelf);
  };
  render() {
    const { wantToRead } = this.state;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {wantToRead === "undefined" && <li />}

          {wantToRead.map((book) => (
            <li key={book.title}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`,
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      onChange={this.updateShelf(book)}
                      defaultValue={book.shelf}
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
      </div>
    );
  }
}

export default WantToRead;
