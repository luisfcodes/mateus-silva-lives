import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './createStore';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login(): void;
  logout(): void;
  addTodo(title: string): void;
  toggleTodoDone(todoId: number): void;
  removeTodo(todoId: number): void;
}

export const useGlobalStore = createStore<IGlobalStore>(
  (setState, getState) => ({
    user: null,
    todos: [],
    login: () =>
      setState({
        user: { name: 'Luis Fernando', email: 'luis.silva9902@gmail.com' },
      }),
    logout: () => setState({ user: null }),
    addTodo: (title) => {
      setState((prevState) => ({
        todos: prevState.todos.concat({
          id: Date.now(),
          title,
          author: getState().user?.name ?? 'Convidado',
          done: false,
        }),
      }));
    },
    toggleTodoDone: (todoId) => {
      setState((prevState) => ({
        todos: prevState.todos.map((todo) =>
          todo.id === todoId ? { ...todo, done: !todo.done } : todo,
        ),
      }));
    },
    removeTodo: (todoId) => {
      setState((prevState) => ({
        todos: prevState.todos.filter((todo) => todo.id !== todoId),
      }));
    },
  }),
);
