import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { deleteBrand } from "../../http/deviceAPI";

const DeleteBrand = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const _deleteBrand = () => {
    deleteBrand({ name: value })
      .then((data) => {
        alert(data.message);
        setValue("");
        onHide();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const requestBody = error.response.data;
          alert(requestBody.message);
        }
        // Обработка ошибки
      });
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название бренда, который хотите удалить"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
        <Button variant="outline-danger" onClick={_deleteBrand}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBrand;
