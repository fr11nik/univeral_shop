import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createType } from "../../http/deviceAPI";
const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [discountSize,setDiscountValue] = useState(0);
  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Создать скидку
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название элемента"}
          />
          <Form.Control
            value={discountSize}
            onChange={(e) => setDiscountValue(e.target.value)}
            placeholder={"Введите скидку от 1 до 99"}
          />
        </Form>
     
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreateType;
