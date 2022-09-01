import { gql } from "@apollo/client";

const addBook = gql`
  mutation addSingleBookMutation(
    $name: String
    $genre: String
    $authorId: ID!
  ) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const addAuthor = gql`
  mutation addSingleAuthorMutation($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

export { addBook, addAuthor };
