import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const OrderTable = ({ orders }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Номер заказа</TableCell>
            <TableCell>Дата заказа</TableCell>
            <TableCell>Общая сумма</TableCell>
            <TableCell>Способ оплаты</TableCell>
            <TableCell>Устройства</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderDetails.id}>
              <TableCell>{order.orderDetails.id}</TableCell>
              <TableCell>
                {order.orderDetails.createdAt.substring(
                  0,
                  order.orderDetails.createdAt.indexOf("T")
                )}
              </TableCell>
              <TableCell>{order.orderDetails.totalAmount} ₽</TableCell>
              <TableCell>{order.orderDetails.paymentMethod}</TableCell>
              <TableCell>
                <ul>
                  {order.devices.map((device) => (
                    <li key={device.id}>{device.name}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
