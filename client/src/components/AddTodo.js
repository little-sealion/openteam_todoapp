import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADDTODO = gql`
  mutation addTodo($title: String!, $due: Date!, $description: String) {
    addTodo(title: $title, due: $due, description: $description) {
      success
      message
      todo {
        id
        title
        description
        due
      }
    }
  }
`;

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');

  const [addTodo] = useMutation(ADDTODO, {
    variables: { title, description, due },
  });
  return (
    <form id="add-todo" onSubmit={addTodo}>
      <div className="field">
        <label>Task title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Due:</label>
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
      <button>+</button>
    </form>
  );
}
