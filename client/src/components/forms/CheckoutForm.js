import React, { useState, useEffect, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Paper, Container } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import { createOrder } from "../../http/orderAPI";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
const CheckoutForm = observer(() => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { basket } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Статус оплаты: " + paymentIntent.status);
      const as = {
        totalAmount: Math.round(paymentIntent.amount / 100),
        paymentMethod: paymentIntent.payment_method_types[0],
      };
      await createOrder(as);
      basket.setTotalCount(0);
    } else {
      setMessage("Ошибка на сервере");
    }
    setIsProcessing(false);
  };
  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 5 }}>
      <Box id="payment-form" onSubmit={handleSubmit} component="form">
        <PaymentElement />
        <Button
          variant="contained"
          type="submit"
          disabled={isProcessing}
          id="submit"
          color="success"
          sx={{ marginTop: "15px" }}
        >
          Оплатить
        </Button>

        <span>{isProcessing ? "Загрузка ..." : ""}</span>
      </Box>
      {message && <div id="payment-message">{message}</div>}
    </Container>
  );
});
export default CheckoutForm;
