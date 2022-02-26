import { longDateFormat } from 'mixin';
import React from 'react';
import { Card } from 'react-bootstrap';
import { ITodo } from 'types';
import styles from './TodoCard.module.scss';

type props = {
  todo: ITodo
}

const TodoCard = ({ todo }: props) => (
  <Card>
    <Card.Body>
      <Card.Title>{todo.title}</Card.Title>
      <Card.Subtitle className={`text-muted ${styles.subtitle}`}>
        {longDateFormat(todo.createdAt)}
      </Card.Subtitle>
      <Card.Text className="mt-3">
        {todo.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default TodoCard;
