/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { generateCurrentDate } from 'mixin';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ITodo } from 'types';

export interface TodoContextType {
  todos : ITodo[];
  addInitialTodos: (todos: ITodo[]) => void;
  createTodo : (title: string, description: string) => void;
  updateTodo : (todo: ITodo) => void;
  deleteTodo : (id : number) => void;
  doneTodos : () => ITodo[];
  unDoneTodos : () => ITodo[];
}

const initialTodos: TodoContextType = {
  todos: [],
  addInitialTodos: () => {},
  createTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  doneTodos: () => [],
  unDoneTodos: () => [],
};

const TodosContext = createContext<TodoContextType>(initialTodos);

type props = {
  children: ReactNode;
};

const TodosContextProvider = ({ children }: props) => {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos.todos);

  const createTodo = (title: string, description: string) => {
    const id = todos[todos.length - 1].id + 1;
    const status = 0;
    const createdAt = generateCurrentDate();
    const newTodo = {
      id,
      title,
      description,
      status,
      createdAt,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const addInitialTodos = (initTodos: ITodo[]) => {
    setTodos((prev) => {
      const notInTodo: ITodo[] = [];
      initTodos.forEach((todo) => {
        const index = prev.findIndex((td) => td.id === todo.id);
        if (index === -1) { notInTodo.push(todo); }
      });
      return [...prev, ...notInTodo];
    });
  };

  const updateTodo = (updatedTodo: ITodo) => {
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    setTodos((prev) => {
      prev[index] = {
        ...prev[index],
        ...updatedTodo,
      };
      return prev;
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const doneTodos = () => {
    const done = todos.filter((item) => item.status === 1);
    return done.sort((a, b) => (
      (new Date(b.createdAt)).getTime() - (new Date(a.createdAt).getTime())
    ));
  };

  const unDoneTodos = () => {
    const unDone = todos.filter((item) => item.status === 0);
    return unDone.sort((a, b) => (
      (new Date(a.createdAt).getTime()) - (new Date(b.createdAt)).getTime()
    ));
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos') as string) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const contextValue = useMemo<TodoContextType>(() => ({
    todos,
    addInitialTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    doneTodos,
    unDoneTodos,
  }), [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const { todos } = useContext(TodosContext);

  return todos;
};

export const useAddInitialTodos = () => {
  const { addInitialTodos } = useContext(TodosContext);

  return addInitialTodos;
};

export const useCreateTodo = () => {
  const { createTodo } = useContext(TodosContext);

  return createTodo;
};

export const useUpdateTodo = () => {
  const { updateTodo } = useContext(TodosContext);

  return updateTodo;
};

export const useDeleteTodo = () => {
  const { deleteTodo } = useContext(TodosContext);

  return deleteTodo;
};

export const useDoneTodos = () => {
  const { doneTodos } = useContext(TodosContext);

  return doneTodos;
};

export const useUnDoneTodos = () => {
  const { unDoneTodos } = useContext(TodosContext);

  return unDoneTodos;
};

export default TodosContextProvider;
