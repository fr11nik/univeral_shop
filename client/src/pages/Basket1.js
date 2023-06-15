import React, { useContext, useEffect, useState } from "react";
import { fetchBasketDevices } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useHistory } from "react-router-dom";
import { deleteBasketDevice } from "../http/basketAPI";
import UserOrders from "../components/BasketTable";
import { Container, Typography, Box, Button } from "@mui/material";
import { Spinner } from "react-bootstrap";

const Basket = observer(() => {
  const { basket } = useContext(Context);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const orderCount =
    basket.totalCount == 1
      ? basket.totalCount + " товар"
      : basket.totalCount + " товара";
  const Delete = async (element) => {
    const targetID =
      element.target.tagName == "path"
        ? element.target.parentNode.id
        : element.target.id;
    try {
      await deleteBasketDevice(targetID);
      alert("Товар удален из корзины");
      basket.setTotalCount(basket.totalCount - 1);
    } catch (e) {
      alert(e.message);
    }
  };
  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <Container maxWidth="xl">
      <div className="basket_header">
        <Typography variant="h4">Корзина</Typography>
        <div>
          <div>В вашей корзине:</div> &nbsp; {orderCount}
        </div>
      </div>
      <UserOrders orders={basket.devices} onDelete={Delete} />
      <Box className="checkout_container">
        <div>Итоговая цена: 110 000 ₽</div>
        <div>
          <Button
            sx={{
              borderColor: "#343a40",
              color: "#343a40",
              borderRadius: "0px",
            }}
            size="large"
            variant="outlined"
          >
            Продолжить покупки
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: "0px", backgroundColor: "#343a40" }}
          >
            Оформить заказ
          </Button>
        </div>
      </Box>
    </Container>
  );
});
export default Basket;
