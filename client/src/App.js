import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Tess's Todo List</h1>
        <TodoList />
        <AddTodo />
      </div>
    </ApolloProvider>
  );
}

export default App;
