import React, { useContext, useEffect, useState } from "react";
import { Container, Paper, Button, Box, TextField } from "@mui/material";
import { Col, Form, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAddress, updateAddress } from "../http/addressAPI";
import { fetchPersonalInfo, updatePersonalInfo } from "../http/personalInfoAPI";
const Profile = observer(() => {
  const { address, personalInfo } = useContext(Context);
  const [error, setError] = useState("Обязательное поле!");
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
    setError(
      value.length < 18 ? "Неполный номер телефона" : "Обязательное поле!"
    );
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
    <Container sx={{ marginTop: 5 }}>
      <h1>Личный кабинет</h1>
      <Box
        component="form"
        id="personal_info"
        onSubmit={handlePersonalInfoSubmit}
        sx={{ marginTop: 2 }}
      >
        <Container
          id="personalInfo_container"
          component={Paper}
          sx={{ padding: 2 }}
        >
          <h5 style={{ marginBottom: 20 }}>Информация о пользователе</h5>
          <Box>
            <TextField
              label="Фамилия"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleUserChange}
              required
              fullWidth
              helperText={"Обязательное поле!"}
            />
            <TextField
              label="Имя"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleUserChange}
              required
              fullWidth
              helperText={"Обязательное поле!"}
            />
          </Box>
          <Box>
            <TextField
              label="Отчество"
              name="patronymic"
              value={userInfo.patronymic}
              onChange={handleUserChange}
              fullWidth
            />

            <TextField
              label="Номер телефона"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handlePhoneNumberChange}
              fullWidth
              onKeyDown={handlePhoneNumberKeyDown}
              color={error !== "" ? "error" : "primary"}
              isInvalid={error !== ""}
              helperText={error}
              required
            />
          </Box>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" type="submit">
              Сохранить
            </Button>
          </div>
        </Container>
      </Box>

      <Box type="form" onSubmit={handleAddressSubmit} sx={{ marginTop: 2 }}>
        <Container
          id="personalInfo_container"
          component={Paper}
          sx={{ marginTop: 5, paddingBottom: "16px", marginBottom: "30px" }}
        >
          <h5 style={{ marginBottom: 20 }}>Информация о доставке</h5>
          <Box>
            <TextField
              name="city"
              label="Город"
              value={addressInfo.city}
              required
              fullWidth
              onChange={handleAddressChange}
            />

            <TextField
              name="street"
              label="Улица"
              required
              value={addressInfo.street}
              onChange={handleAddressChange}
              fullWidth
            />
            <TextField
              name="house"
              label="Дом"
              required
              value={addressInfo.house}
              onChange={handleAddressChange}
            />

            <TextField
              required
              name="entrance"
              label="Подъезд"
              value={addressInfo.entrance}
              onChange={handleAddressChange}
            />

            <TextField
              name="floor"
              label="Этаж"
              value={addressInfo.floor}
              onChange={handleAddressChange}
            />

            <TextField
              name="apartment"
              label="Квартира"
              value={addressInfo.apartment}
              onChange={handleAddressChange}
            />

            <TextField
              multiline
              name="comment"
              label="Комментарий"
              value={addressInfo.comment}
              onChange={handleAddressChange}
              fullWidth
              helperText={
                "В данное поле впишите всю дополнительную информацию которая будет полезна к заказу!"
              }
            />
          </Box>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" type="submit">
              Сохранить
            </Button>
          </div>
        </Container>
      </Box>
    </Container>
  );
});

export default Profile;
