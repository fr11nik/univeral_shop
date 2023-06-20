import React, { useContext } from "react";

import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useHistory } from "react-router-dom";
import { deleteBasketDevice } from "../http/basketAPI";
import UserOrders from "../components/BasketTable";
import { Container, Typography, Box, Button } from "@mui/material";

import { ORDER_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { verify } from "../http/personalInfoAPI";
const Basket = observer(() => {
  const { basket } = useContext(Context);
  const history = useHistory();

  var totalSum = 0;
  const handleCheckout = () => {
    verify().then((res) => {
      const isValid = res.data;
      if (!isValid) {
        alert(
          "Ошибка заполнения персональных данных для доставки, или персональных данных"
        );
        history.push(PROFILE_ROUTE);
        return;
      }

      history.push(ORDER_ROUTE);
      return;
    });
  };
  basket.devices.forEach((item) => {
    if (item.device.discount) {
      let discountedPrice = 0;
      discountedPrice =
        item.device.price -
        item.device.price * (item.device.discount.discountSize / 100);
      totalSum += discountedPrice;
    } else totalSum += item.device.price;
  });
  const orderCount =
    basket.totalCount === 1
      ? basket.totalCount + " товар"
      : basket.totalCount + " товара";
  const Delete = async (element) => {
    const targetID =
      element.target.tagName === "path"
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
        <div>Итоговая цена: {totalSum} ₽</div>
        <div>
          <Button
            sx={{
              borderColor: "#343a40",
              color: "#343a40",
              borderRadius: "0px",
            }}
            onClick={() => history.push(SHOP_ROUTE)}
            size="large"
            variant="outlined"
          >
            Продолжить покупки
          </Button>
          {totalSum !== 0 ? (
            <Button
              onClick={handleCheckout}
              variant="contained"
              size="large"
              sx={{ borderRadius: "0px", backgroundColor: "#343a40" }}
            >
              Оформить заказ
            </Button>
          ) : (
            <></>
          )}
        </div>
      </Box>
    </Container>
  );
});
export default Basket;
