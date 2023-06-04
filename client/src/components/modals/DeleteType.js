import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { deleteType } from "../../http/deviceAPI";

const DeleteType = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const _deleteType = async () => {
    try {
      const res = await deleteType({ name: value });
      if (res.message) {
        alert(res.message);
        setValue("");
        onHide();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const requestBody = error.response.data;
        alert(requestBody.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название типа, который хотите удалить"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button variant="outline-danger" onClick={_deleteType}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteType;
