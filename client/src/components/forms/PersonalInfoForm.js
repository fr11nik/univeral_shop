import React from "react";
import { useContext, useEffect, useState } from "react";
import { TextField, Box, Container, Paper, Button } from "@mui/material";
import { Context } from "../../";
import {
  fetchPersonalInfo,
  updatePersonalInfo,
} from "../../http/personalInfoAPI";

const PersonalProfileForm = () => {
  const [error, setError] = useState("Обязательное поле!");
  const { personalInfo } = useContext(Context);
  const [userInfo, setUserInfo] = useState({
    lastName: "",
    firstName: "",
    patronymic: "",
    phoneNumber: "",
  });
  useEffect(() => {
    fetchPersonalInfo().then((data) => {
      setUserInfo(data);
      personalInfo.setPersonalInfo(data);
    });
  }, []);
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.phoneNumber.length < 18) {
      setError("Неполный номер телефона");
      return;
    }
    const res = await updatePersonalInfo(userInfo);
    alert(res.message);
  };
  const handlePhoneNumberKeyDown = (event) => {
    const { value } = event.target;
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
  return (
    <Box
      component="form"
      id="personal_info"
      onSubmit={handlePersonalInfoSubmit}
      sx={{ marginTop: 2 }}
    >
      <Container id="profile_container" component={Paper} sx={{ padding: 2 }}>
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
  );
};
export default PersonalProfileForm;
