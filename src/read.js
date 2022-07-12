import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./book";

class Read extends Component {
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

export default Read;
