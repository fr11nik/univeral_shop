import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Spinner, Button } from "react-bootstrap";
import { fetchBasketDevices } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useHistory } from "react-router-dom";
import { BASKET_ROUTE } from "../utils/consts";
import { deleteBasketDevice } from "../http/basketAPI";
const Basket = observer(() => {
  const { device } = useContext(Context);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchBasketDevices().then((data) => {
      device.setDevices(data.basket_devices);
      setLoading(false);
    });
  }, []);
  const Delete = async (element) => {
    try {
      await deleteBasketDevice(element.target.id);
      alert("Товар удален из корзины");
      history.push(BASKET_ROUTE);
    } catch (e) {
      alert(e.response);
    }
  };
  if (loading) {
    return <Spinner animation={"grow"} />;
  }
  return (
    <Container>
      {device.devices.map((item) => (
        <Card key={item.id}>
          <Card.Img
            variant="top"
            src={
              item.deviceId && process.env.REACT_APP_API_URL + item.device.img
            }
            style={{ height: "200px", objectFit: "contain" }}
          />
          <Card.Body>
            <Card.Title>{item.device.name}</Card.Title>
            <Card.Text>Price: {item.device.price}</Card.Text>
            <Card.Text>Amount: {item.amount}</Card.Text>
            <Button id={item.id} onClick={Delete} variant="outline-danger">
              Удалить
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
});
export default Basket;



  
