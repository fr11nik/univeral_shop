import React, { useEffect, useState } from "react";
import OrderTable from "../components/OrderTable";
import { getOrder } from "../http/orderAPI";
import { CircularProgress, Box, Paper, Container } from "@mui/material/";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getOrder().then((items) => {
      setData(items);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{ marginTop: "50px" }} component={Paper}>
          <OrderTable orders={data} />
        </Container>
      )}
    </>
  );
};
export default MyOrders;
