import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams, useHistory } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { createBasketDevice } from "../http/basketAPI";
import { BASKET_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "..";
const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });
  const { basket } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  const click = async () => {
    try {
      await createBasketDevice({ id });
      alert("Товар добавлен в корзину");
      basket.setTotalCount(basket.totalCount + 1);
      history.push(BASKET_ROUTE);
    } catch (e) {
      alert(e.response);
    }
  };
  let discountedPrice = 0;
  if (device.discount) {
    discountedPrice =
      device.price - device.price * (device.discount.discountSize / 100);
  }
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            {discountedPrice > 0 ? (
              <>
                <span
                  style={{ fontWeight: 700, color: "#dc3545" }}
                  className="discounted-price"
                >
                  {discountedPrice.toFixed(2)} ₽
                </span>
                <span
                  style={{
                    fontSize: 12,
                    textDecoration: "line-through",
                    color: "#8c8c8c",
                    marginLeft: 5,
                  }}
                  className="original-price"
                >
                  {device.price} ₽
                </span>
              </>
            ) : (
              <span style={{ fontWeight: "bold" }}>{device.price} ₽</span>
            )}
            <Button onClick={click} variant={"outline-dark"}>
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;
