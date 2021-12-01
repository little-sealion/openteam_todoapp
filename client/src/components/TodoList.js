import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import TodoDetails from './TodoDetails';

export const TODOS = gql`
  query getTodos {
    todosForHome {
      id
      title
      description
      due
    }
  }
`;

export default function TodoList() {
  const { loading, error, data } = useQuery(TODOS);
  const [selected, setSelected] = useState('');

  if (loading) return <div>Loading todos......</div>;
  if (error) return <div>Oooooops,failed to load todos</div>;
  return (
    <div>
      <ul id="todo-list">
        {data?.todosForHome?.map((todo) => {
          return (
            <li
              key={todo.id}
              onClick={() => {
                setSelected(todo.id);
              }}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
      <TodoDetails todoId={selected} />
    </div>
  );
}
