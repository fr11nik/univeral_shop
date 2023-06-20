import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { $authHost } from "../http";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/forms/CheckoutForm";
import { Container } from "react-bootstrap";
import { Context } from "..";
function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { basket } = useContext(Context);
  var totalSum = 0;
  useEffect(() => {
    setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_API));
    $authHost.post("/api/stripe/create-payment-intent", {}).then((res) => {
      const { clientSecret } = res.data;
      setClientSecret(clientSecret);
    });
  }, []);
  basket.devices.forEach((item) => {
    if (item.device.discount) {
      let discountedPrice = 0;
      discountedPrice =
        item.device.price -
        item.device.price * (item.device.discount.discountSize / 100);
      totalSum += discountedPrice;
    } else totalSum += item.device.price;
  });
  return (
    <Container>
      <h3 style={{ textAlign: "center", margin: "20px 0px 30px 0px " }}>
        Оплата товара на сумму: {totalSum} рублей
      </h3>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </Container>
  );
}

export default Payment;
