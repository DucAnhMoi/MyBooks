import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetails from "./BookDetails";

import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries.js";

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;
  console.log(data);
  return (
    <Row>
      <Col xs={8}>
        {data.books.map((book) => (
          <Card
            key={book.id}
            border="info"
            text="info"
            className="text-center shadow"
            onClick={() => setBookSelected(book.id)}
          >
            <Card.Body>{book.name}</Card.Body>
          </Card>
        ))}
      </Col>
      <Col>
        <BookDetails bookSelected={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookList;
