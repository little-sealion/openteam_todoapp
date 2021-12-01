const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  due: {
    type: Date,
    required: true,
  },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
module.exports = Todo;
