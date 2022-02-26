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
  todoById: (id: number) => ITodo | undefined,
  updateTodo : (id: number, title: string, description: string) => void;
  changeStatus : (id: number) => void;
  deleteTodo : (id : number) => void;
  doneTodos : () => ITodo[];
  unDoneTodos : () => ITodo[];
}

const initialTodos: TodoContextType = {
  todos: [],
  addInitialTodos: () => {},
  createTodo: () => {},
  todoById: () => undefined,
  updateTodo: () => {},
  changeStatus: () => {},
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
    const id = new Date().getTime() + Math.random();
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

  const todoById = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    return todos[index];
  };

  const updateTodo = (id: number, title: string, description: string) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const updateTodos = [...todos];
    updateTodos[index].title = title;
    updateTodos[index].description = description;
    setTodos(updateTodos);
  };

  const changeStatus = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const updateTodos = [...todos];
    updateTodos[index].status = updateTodos[index].status === 1 ? 0 : 1;
    setTodos(updateTodos);
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
    todoById,
    updateTodo,
    changeStatus,
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

export const useTodoById = () => {
  const { todoById } = useContext(TodosContext);

  return todoById;
};

export const useUpdateTodo = () => {
  const { updateTodo } = useContext(TodosContext);

  return updateTodo;
};

export const useChangeStatus = () => {
  const { changeStatus } = useContext(TodosContext);

  return changeStatus;
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
