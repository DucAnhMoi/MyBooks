import { gql } from "@apollo/client";

const getBooks = gql`
  query getBooksQuery {
    books {
      name
      id
    }
  }
`;

const getBook = gql`
  query getBookQuery($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const getAuthors = gql`
  query getAuthorsQuery {
    authors {
      id
      name
    }
  }
`;

export { getBooks, getBook, getAuthors };
