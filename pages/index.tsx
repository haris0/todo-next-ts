import type { GetStaticProps, NextPage } from 'next';
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
   console.log(todoRes, todoErr);

   return (
     <Container className="container-custom">
       <main className={styles.main}>
         <div>
           {todoRes && !todoErr && (
             <ul>
               { todoRes.map((todo) => (
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
