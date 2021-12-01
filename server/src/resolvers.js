const dateScalar = require('./dateScalar');
const dbConnect = require('./dataSources/dbConnect');
const Todo = require('./dataSources/models');

const resolvers = {
  Date: dateScalar,
  Query: {
    todosForHome: async () => {
      await dbConnect();
      const todos = await Todo.find({});
      return todos;
    },
    todo: async (_, { id }) => {
      await dbConnect();
      const todo = await Todo.findById(id);
      return todo;
    },
  },
  Mutation: {
    addTodo: async (_, { title, description, due }) => {
      try {
        await dbConnect();
        let newTodo = new Todo({ title, description, due });
        let addedTodo = await newTodo.save();
        return {
          success: true,
          message: 'todo task added successfully',
          todo: addedTodo,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
          todo: null,
        };
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        await dbConnect();
        const res = await Todo.deleteOne({ _id: id });
        return {
          success: true,
          message: 'todo task deleted successfully',
          // `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ name: ... }`
          deleted: res.deletedCount,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          deleted: null,
        };
      }
    },
    updateTodo: async (_, { id, title, description, due }) => {
      try {
        await dbConnect();
        let res = await Todo.updateOne(
          { _id: id },
          {
            $set: { title: title, description: description, due: due },
          }
        );
        console.log(res);
        return {
          success: true,
          message: 'todo task updated successfully',
          modifiedCount: res.modifiedCount,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          modifiedCount: res.modifiedCount,
        };
      }
    },
  },
};

module.exports = resolvers;
