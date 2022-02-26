/* eslint-disable react-hooks/exhaustive-deps */
import FormModal from 'components/FormModal/FormModal';
import TodoCard from 'components/TodoCard/TodoCard';
import {
  useAddInitialTodos,
  useCreateTodo,
  useDoneTodos,
  useUnDoneTodos,
} from 'context/TodosContext';
import type { GetStaticProps, NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
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
  const createTodo = useCreateTodo();

  const [actionType, setActionType] = useState<'create' | 'update'>('create');

  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  const setDefaultModal = () => {
    setTitle('');
    setDesc('');
    setModalShow(false);
  };

  const handleCreateTodo = () => {
    setActionType('create');
    setModalShow(true);
  };

  const handleSubmit = (type: string) => {
    console.log(type);
    createTodo(title, desc);
    setDefaultModal();
  };

  useEffect(() => {
    setTimeout(() => {
      addInitialTodos(todoRes);
    });
  }, []);

  return (
    <Container className="container-custom">
      <FormModal
        type={actionType}
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={title}
        desc={desc}
        onTitleChange={handleTitleChange}
        onDescChange={handleDescChange}
        onSubmit={(type) => handleSubmit(type)}
      />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Todo List</h1>
          <button
            type="button"
            className={styles.create_button}
            onClick={() => handleCreateTodo()}
          >
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
