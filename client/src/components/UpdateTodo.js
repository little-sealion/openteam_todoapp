import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATETODO = gql`
  mutation updateTodo(
    $updateTodoId: ID!
    $title: String
    $description: String
    $due: Date
  ) {
    updateTodo(
      id: $updateTodoId
      title: $title
      description: $description
      due: $due
    ) {
      success
      message
      modifiedCount
    }
  }
`;

export default function UpdateTodo({ updateTodoId, title, description, due }) {
  console.log(
    'updateTodoId',
    updateTodoId,
    'title',
    title,
    'description',
    description,
    'due',
    new Date(due).toISOString().substr(0, 10)
  );
  const [utitle, setTitle] = useState(title);
  const [udescription, setDescription] = useState(description);
  const [udue, setDue] = useState(due);

  const [updateTodo] = useMutation(UPDATETODO, {
    variables: {
      updateTodoId,
      title: utitle,
      description: udescription,
      due: udue,
    },
  });
  return (
    <form id="update-todo" onSubmit={updateTodo}>
      <div className="field">
        <label>Task title:</label>
        <input
          type="text"
          value={utitle}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Description:</label>
        <textarea
          value={udescription}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Due:</label>
        <input
          type="date"
          value={new Date(udue).toISOString().substr(0, 10)}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
      <button>Save</button>
    </form>
  );
}
