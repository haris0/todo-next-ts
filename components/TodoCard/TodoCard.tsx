/* eslint-disable no-unused-vars */
import { longDateFormat } from 'mixin';
import { Button, Card } from 'react-bootstrap';
import { ITodo } from 'types';
import styles from './TodoCard.module.scss';

type props = {
  todo: ITodo
  type: 'undone' | 'done',
  onChangeStatus: (id: number) => void,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
}

const TodoCard = ({
  type,
  todo,
  onChangeStatus,
  onEdit,
  onDelete,
}: props) => (
  <Card>
    <Card.Body>
      <Card.Title>{todo.title}</Card.Title>
      <Card.Subtitle className={`text-muted ${styles.subtitle}`}>
        {longDateFormat(todo.createdAt)}
      </Card.Subtitle>
      <Card.Text className="mt-3">
        {todo.description}
      </Card.Text>
      <Button
        variant="success"
        className={styles.margin}
        onClick={() => onChangeStatus(todo.id)}
      >
        {type === 'undone' ? 'Done' : 'UnDone'}
      </Button>
      <Button
        variant="warning"
        className={styles.margin}
        onClick={() => onEdit(todo.id)}
      >
        Edit
      </Button>
      {type === 'undone' && (
        <Button
          variant="danger"
          className={styles.margin}
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </Button>
      )}
    </Card.Body>
  </Card>
);

export default TodoCard;
