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

  type User {
    id: ID!
    email: String!
    fullName: String!
    role: String!
    address1: String
    address2: String
    favoriteBookId: String
    favoriteBook: Book
    createdAt: String!
    updatedAt: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type OrderItem {
    id: ID!
    bookId: String!
    book: Book!
    quantity: Int!
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    id: ID!
    userId: String!
    user: User!
    orderItems: [OrderItem!]!
    totalAmount: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  input SignupInput {
    email: String!
    password: String!
    fullName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateProfileInput {
    fullName: String
    address1: String
    address2: String
    favoriteBookId: String
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

  type Query {
    # Books
    books: [Book!]!
    book(id: ID!): Book
    bookByIsbn(isbn: String!): Book

    # Categories
    categories: [Category!]!
    category(id: ID!): Category

    # Users (admin only for users query)
    users: [User!]!
    user(id: ID!): User
    me: User
    myOrders: [Order!]!
  }

  type Mutation {
    # Authentication
    signup(input: SignupInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!

    # Books
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
    deleteBook(id: ID!): Book!

    # Categories
    createCategory(input: CreateCategoryInput!): Category!
    deleteCategory(id: ID!): Category!

    # Users
    updateProfile(input: UpdateProfileInput!): User!
    deleteUser(id: ID!): User!
  }
`;
