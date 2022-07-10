import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class Read extends Component {
  state = {
    read: [],
    isLoading: true,
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const lib = books.filter((book) => book.shelf === "read");
      this.setState(() => ({
        read: lib,
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
    const { read } = this.state;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {read === "undefined" && <li />}

          {read.map((book) => (
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
      </div>
    );
  }
}

export default Read;
