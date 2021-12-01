const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  type Query {
    "query to get an array of todo tasks for home page"
    todosForHome: [Todo!]!

    "get a specific todo task by id"
    todo(id: ID!): Todo
  }

  type Todo {
    id: ID!
    title: String!
    description: String
    due: Date!
  }

  type Mutation {
    addTodo(title: String!, description: String, due: Date!): AddTodoResponse!
    deleteTodo(id: ID!): DeleteTodoResponse!
    updateTodo(
      id: ID!
      title: String
      description: String
      due: Date
    ): UpdateTodoResponse!
  }

  type AddTodoResponse {
    success: Boolean!
    message: String!
    todo: Todo
  }
  type DeleteTodoResponse {
    success: Boolean!
    message: String!
    deleted: Int
  }
  type UpdateTodoResponse {
    success: Boolean!
    message: String!
    modifiedCount: Int
  }
`;

module.exports = typeDefs;
