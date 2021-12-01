import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import UpdateTodo from './UpdateTodo';

const GETTODO = gql`
  query getTodo($todoId: ID!) {
    todo(id: $todoId) {
      id
      title
      description
      due
    }
  }
`;
const DELETETODO = gql`
  mutation deleteTodo($deleteTodoId: ID!) {
    deleteTodo(id: $deleteTodoId) {
      success
      message
      deleted
    }
  }
`;

export default function TodoDetails(props) {
  const { data } = useQuery(GETTODO, {
    variables: { todoId: props.todoId },
  });
  const [deleteTodo] = useMutation(DELETETODO, {
    variables: { deleteTodoId: props.todoId },
  });
  const [show, setShow] = useState(false);

  if (data?.todo) {
    console.log(data);
    let due = new Date(data.todo.due).toDateString();
    return (
      <div id="todo-details">
        {!show && (
          <div>
            <h2>{data?.todo?.title}</h2>
            <p>{data?.todo?.description}</p>
            <p> Due:{due}</p>
            <button
              onClick={(e) => {
                console.log('update button clicked');
                setShow(true);
              }}
            >
              Update
            </button>
            <button
              onClick={(e) => {
                deleteTodo();
                window.location.reload(true);
              }}
            >
              Delete
            </button>
          </div>
        )}

        {show && (
          <UpdateTodo
            updateTodoId={data?.todo?.id}
            title={data?.todo?.title}
            description={data?.todo?.description}
            due={data.todo.due}
          />
        )}
      </div>
    );
  } else {
    return <div>No task selected...</div>;
  }
}
