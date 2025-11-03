import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    price: Float!
    isbn: String!
    coverImage: String
    category: String!
    stock: Int!
    published: String!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    createdAt: String!
    updatedAt: String!
  }

  type Customer {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
    description: String
    price: Float!
    isbn: String!
    coverImage: String
    category: String!
    stock: Int!
    published: String!
  }

  input UpdateBookInput {
    title: String
    author: String
    description: String
    price: Float
    isbn: String
    coverImage: String
    category: String
    stock: Int
    published: String
  }

  input CreateCategoryInput {
    name: String!
    slug: String!
  }

  input CreateCustomerInput {
    email: String!
    firstName: String!
    lastName: String!
    phone: String
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    bookByIsbn(isbn: String!): Book
    categories: [Category!]!
    category(id: ID!): Category
    customers: [Customer!]!
    customer(id: ID!): Customer
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
    deleteBook(id: ID!): Book!
    createCategory(input: CreateCategoryInput!): Category!
    deleteCategory(id: ID!): Category!
    createCustomer(input: CreateCustomerInput!): Customer!
    deleteCustomer(id: ID!): Customer!
  }
`;
