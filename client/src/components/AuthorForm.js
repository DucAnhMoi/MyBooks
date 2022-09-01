import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useMutation } from "@apollo/client";
import { getAuthors } from "../graphql-client/queries";
import { addAuthor } from "../graphql-client/mutation";

const AuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  const { name, age } = newAuthor;
  const onInputChange = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const [addaAuthor, dataMutation] = useMutation(addAuthor);
  const onSubmit = (e) => {
    e.preventDefault();
    addaAuthor({
      variables: { name, age: parseInt(age) },
      refetchQueries: [{ query: getAuthors }],
    });
    setNewAuthor({
      name: "",
      age: "",
    });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="invisible my-4">
        <Form.Control type="text" placeholder="Author name" />
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          onChange={onInputChange}
          value={name}
        />
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Control
          type="number"
          placeholder="Author age"
          name="age"
          onChange={onInputChange}
          value={age}
        />
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AuthorForm;
