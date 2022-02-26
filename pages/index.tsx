/* eslint-disable react-hooks/exhaustive-deps */
import TodoCard from 'components/TodoCard/TodoCard';
import {
  useAddInitialTodos,
  useDoneTodos,
  useUnDoneTodos,
} from 'context/TodosContext';
import type { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getTodoData } from 'services';
import { ITodo } from 'types';
import styles from '../styles/Home.module.scss';

export const getStaticProps: GetStaticProps = async () => {
  const { todoRes, todoErr } = await getTodoData();

  return {
    props: {
      todoRes,
      todoErr,
    },
    revalidate: 10,
  };
};

const Home: NextPage<{
  todoRes: ITodo[],
  todoErr: boolean
}> = ({
  todoRes,
  todoErr,
}) => {
  const doneTodos = useDoneTodos();
  const unDoneTodos = useUnDoneTodos();
  const addInitialTodos = useAddInitialTodos();

  useEffect(() => {
    setTimeout(() => {
      addInitialTodos(todoRes);
    });
  }, []);

  return (
    <Container className="container-custom">
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Todo List</h1>
          <button type="button" className={styles.create_button}>
            Create Todo
          </button>
        </div>
        <div className={styles.board}>
          <div className={styles.todo}>
            <h2 className="header">
              Todo
            </h2>
            {unDoneTodos() && (
              <div className={styles.todo_list}>
                {unDoneTodos().map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
              </div>
            )}
          </div>
          <div className={styles.completed}>
            <h2 className="header">
              Completed
            </h2>
            {doneTodos() && (
              <div className={styles.todo_list}>
                {doneTodos().map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          {todoErr && !todoRes && (
            <h3>Initial data not loaded</h3>
          )}
        </div>
      </main>
    </Container>
  );
};

export default Home;
