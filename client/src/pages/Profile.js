import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAddress, updateAddress } from "../http/addressAPI";
import { fetchPersonalInfo, updatePersonalInfo } from "../http/personalInfoAPI";
const Profile = observer(() => {
  const { address, personalInfo } = useContext(Context);
  const [error, setError] = useState("");
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
  const handlePhoneNumberKeyDown = (event) => {
    const { name, value } = event.target;
    const maxLength = 18; // Максимальная длина номера телефона
    if (value.length >= maxLength && event.key !== "Backspace") {
      event.preventDefault();
    }
  };
  const handlePhoneNumberChange = (e) => {
    let { name, value } = e.target;
    // Форматирование номера телефона
    value = value.replace(/\D/g, ""); // Удаление всех символов, кроме цифр
    value = value.replace(
      /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/,
      "+$1 ($2) $3-$4-$5"
    ); // Форматирование ввода
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
    setError(value.length < 18 ? "Неполный номер телефона" : "");
  };
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
    if (userInfo.phoneNumber.length < 18) {
      setError("Неполный номер телефона");
      return;
    }
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
                required
                value={userInfo.lastName}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                required
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
                required
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handlePhoneNumberChange}
                onKeyDown={handlePhoneNumberKeyDown}
                isInvalid={error !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
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
                required
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formStreet">
              <Form.Label>Улица</Form.Label>
              <Form.Control
                type="text"
                name="street"
                required
                value={addressInfo.street}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formHouse">
              <Form.Label>Дом</Form.Label>
              <Form.Control
                type="text"
                name="house"
                required
                value={addressInfo.house}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formEntrance">
              <Form.Label>Подъезд</Form.Label>
              <Form.Control
                type="text"
                required
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
                required
                value={addressInfo.floor}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formApartment">
              <Form.Label>Квартира</Form.Label>
              <Form.Control
                type="text"
                name="apartment"
                required
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
