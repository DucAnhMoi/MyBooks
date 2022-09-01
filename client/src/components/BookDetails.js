import React, { Fragment } from "react";
import { Card } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { getBook } from "../graphql-client/queries";

const BookDetails = ({ bookSelected }) => {
  const { loading, error, data } = useQuery(getBook, {
    variables: {
      id: bookSelected,
    },
    skip: bookSelected === null,
  });

  if (loading) return <p>Loading book details</p>;
  if (error) return <p>Error loading book details</p>;

  const book = bookSelected !== null ? data.book : null;
  return (
    <Card bg="info" text="white">
      <Card.Body>
        {book === null ? (
          <Card.Text>Please select a book</Card.Text>
        ) : (
          <Fragment>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle>{book.genre}</Card.Subtitle>
            <p>Name: {book.author.name}</p>
            <p>Age: {book.author.age}</p>
            <p>All books by this author</p>
            <ul>
              {book.author.books.map((book) => (
                <li key={book.id}>{book.name}</li>
              ))}
            </ul>
          </Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
