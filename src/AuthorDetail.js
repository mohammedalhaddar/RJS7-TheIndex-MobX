import React, { Component } from "react";
import axios from "axios";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

import authorStore from "./stores/authorStore";
import bookStore from "./stores/bookStore";
import {observer} from "mobx-react";

function AuthorDetail(props) {
    const authId = props.match.params.authorID;
    const author = authorStore.getAuthorById(authId);
    const books = bookStore.books.filter( book => author.books.includes(book.id));
    if (authorStore.loading || bookStore.loading ) {
      return <Loading />;
    } else {
      const authorName = `${author.first_name} ${author.last_name}`;
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable books={books} />
        </div>
      );
    }
}

export default observer(AuthorDetail);
