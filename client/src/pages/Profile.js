import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAddress, updateAddress } from "../http/addressAPI";
import { fetchPersonalInfo, updatePersonalInfo } from "../http/personalInfoAPI";
const Profile = observer(() => {
  const { address, personalInfo } = useContext(Context);
  const [userInfo, setUserInfo] = useState({
    lastName: "",
    firstName: "",
    patronymic: "",
    phoneNumber: "",
  });

  const [addressInfo, setAddressInfo] = useState({
    city: "",
    street: "",
    house: "",
    entrance: "",
    floor: "",
    apartment: "",
    comment: "",
  });
  useEffect(() => {
    fetchAddress().then((data) => {
      setAddressInfo(data);
      address.setAddress(data);
    });
    fetchPersonalInfo().then((data) => {
      setUserInfo(data);
      personalInfo.setPersonalInfo(data);
    });
  }, []);
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleAddressChange = async (e) => {
    const { name, value } = e.target;
    setAddressInfo((prevAddressInfo) => ({
      ...prevAddressInfo,
      [name]: value,
    }));
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    const res = await updatePersonalInfo(userInfo);
    alert(res.message);
  };
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const res = await updateAddress(addressInfo);
    alert(res.message);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Личный кабинет</h1>
          <Form
            id="personal_info"
            onSubmit={handlePersonalInfoSubmit}
            style={{
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>Информация о пользователе</h2>
            <Form.Group controlId="formLastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formPatronymic">
              <Form.Label>Отчество</Form.Label>
              <Form.Control
                type="text"
                name="patronymic"
                value={userInfo.patronymic}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Номер телефона</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </Form>

          <Form onSubmit={handleAddressSubmit} style={{ padding: "20px" }}>
            <h2>Адрес</h2>
            <Form.Group controlId="formCity">
              <Form.Label>Город</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={addressInfo.city}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formStreet">
              <Form.Label>Улица</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={addressInfo.street}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formHouse">
              <Form.Label>Дом</Form.Label>
              <Form.Control
                type="text"
                name="house"
                value={addressInfo.house}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formEntrance">
              <Form.Label>Подъезд</Form.Label>
              <Form.Control
                type="text"
                name="entrance"
                value={addressInfo.entrance}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formFloor">
              <Form.Label>Этаж</Form.Label>
              <Form.Control
                type="text"
                name="floor"
                value={addressInfo.floor}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formApartment">
              <Form.Label>Квартира</Form.Label>
              <Form.Control
                type="text"
                name="apartment"
                value={addressInfo.apartment}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Комментарий</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={addressInfo.comment}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default Profile;
