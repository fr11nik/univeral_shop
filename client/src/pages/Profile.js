import React, { useContext, useEffect, useState } from "react";
import { Container, Paper, Button, Box, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAddress, updateAddress } from "../http/addressAPI";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import { getOrder } from "../http/orderAPI";

const Profile = observer(() => {
  const { address, user } = useContext(Context);
  const [order, setOrder] = useState({});
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
    getOrder().then((data) => {
      setOrder(data);
    });
  }, []);

  const handleAddressChange = async (e) => {
    const { name, value } = e.target;
    setAddressInfo((prevAddressInfo) => ({
      ...prevAddressInfo,
      [name]: value,
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const res = await updateAddress(addressInfo);
    alert(res.message);
  };
  return (
    <Container sx={{ marginTop: 5 }}>
      <h1>Личный кабинет</h1>
      <PersonalInfoForm />
      <Box
        component="form"
        onSubmit={handleAddressSubmit}
        sx={{ marginTop: 2 }}
      >
        <Container
          id="profile_container"
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
            <>
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
                type="number"
                value={addressInfo.floor}
                onChange={handleAddressChange}
              />

              <TextField
                name="apartment"
                label="Квартира"
                value={addressInfo.apartment}
                onChange={handleAddressChange}
              />
            </>
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
      <Container component={Paper} sx={{ marginBottom: "40px" }}></Container>
    </Container>
  );
});

export default Profile;
