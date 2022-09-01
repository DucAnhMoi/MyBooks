import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addBook } from "../graphql-client/mutation";
const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { name, genre, authorId } = newBook;
  const onInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const { loading, error, data } = useQuery(getAuthors);
  const [addaBook, dataMutation] = useMutation(addBook);
  const onSubmit = (e) => {
    e.preventDefault();
    addaBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooks }],
    });
    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="my-4">
        <Form.Control
          type="text"
          placeholder="Book name"
          onChange={onInputChange}
          value={name}
          name="name"
        />
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Control
          type="text"
          placeholder="Book genre"
          onChange={onInputChange}
          value={genre}
          name="genre"
        />
      </Form.Group>
      <Form.Group className="my-4">
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <Form.Control
            as="select"
            onChange={onInputChange}
            value={authorId}
            name="authorId"
          >
            <option disabled value="">
              Select author
            </option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        )}
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default BookForm;
