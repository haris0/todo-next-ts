/* eslint-disable react-hooks/exhaustive-deps */
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
        <div>
          <h5>Todo</h5>
          {unDoneTodos() && (
            <ul>
              { unDoneTodos().map((todo) => (
                <li key={todo.id}> {todo.title} </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h5>Completed</h5>
          {doneTodos() && (
            <ul>
              { doneTodos().map((todo) => (
                <li key={todo.id}> {todo.title} </li>
              ))}
            </ul>
          )}
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
