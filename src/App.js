import React, { Component } from "react";
import "./App.css";
import CurrentlyReading from "./currentlyReading";
import Read from "./read";
import WantToRead from "./wantToRead";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends Component {
  constructor() {
    super();
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantToRead: books.filter((book) => book.shelf === "wantToRead"),
        read: books.filter((book) => book.shelf === "read"),
      });
    });
  }
  updateShelf = (book) => (event) => {
    const shelf = event.target.value;
    book.shelf = shelf;
    this.setState({
      currentlyReading:
        book.shelf === "currentlyReading"
          ? [...this.state.currentlyReading, book]
          : this.state.currentlyReading.some((item) => item.id === book.id)
          ? [...this.state.currentlyReading.filter((b) => b.id !== book.id)]
          : [...this.state.currentlyReading],
      wantToRead:
        book.shelf === "wantToRead"
          ? [...this.state.wantToRead, book]
          : this.state.wantToRead.some((item) => item.id === book.id)
          ? [...this.state.wantToRead.filter((b) => b.id !== book.id)]
          : [...this.state.wantToRead],
      read:
        book.shelf === "read"
          ? [...this.state.read, book]
          : this.state.read.some((item) => item.id === book.id)
          ? [...this.state.read.filter((b) => b.id !== book.id)]
          : [...this.state.read],
    });
    BooksAPI.update(book, shelf);
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
                <CurrentlyReading
                  books={this.state.currentlyReading}
                  onAdd={this.updateShelf}
                />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <WantToRead
                  books={this.state.wantToRead}
                  onAdd={this.updateShelf}
                />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <Read books={this.state.read} onAdd={this.updateShelf} />
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
