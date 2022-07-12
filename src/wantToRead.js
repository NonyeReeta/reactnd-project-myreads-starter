import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class WantToRead extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  render() {
    const { books, onAdd } = this.props;
    return (
      <div className="bookshelf-books">
        <Book books={books} onAdd={onAdd} />
      </div>
    );
  }
}

export default WantToRead;
