/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './FormModal.module.scss';

type props = {
  show: boolean,
  onHide: () => void,
  type: 'create' | 'update',
  title: string,
  desc: string,
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onDescChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (type: string) => void,
}

const FormModal = ({
  show,
  onHide,
  type,
  title,
  desc,
  onTitleChange,
  onDescChange,
  onSubmit,
}: props) => (
  <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title className={styles.title}>
        {type} Todo
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            placeholder="Input Title"
            onChange={onTitleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={desc}
            rows={3}
            onChange={onDescChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => onSubmit(type)}>Submit</Button>
    </Modal.Footer>
  </Modal>

);

export default FormModal;
