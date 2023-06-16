import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
/**items follows :
 * type Array of items
 * fields::::
 * device:{
 * brandId:int
 * img:string
 * name:string
 * price:int
 * rating:int (min-0 max-5)
 * typeId:int
 * }
 * deviceId:int
 * id:int
 */

const UserOrders = ({ orders: items = [], onDelete: Delete }) => {
  return (
    <TableContainer>
      <Table className="ordersTable">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Наименование товара</TableCell>
            <TableCell>Рейтинг</TableCell>
            <TableCell>Цена</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            let discountedPrice = 0;
            if (item.device.discount) {
              discountedPrice =
                item.device.price -
                item.device.price * (item.device.discount.discountSize / 100);
            }
            return (
              <TableRow className="table-row-device" key={item.device.id}>
                <TableCell>
                  <img
                    src={process.env.REACT_APP_API_URL + item.device.img}
                    alt={item.device.name}
                    width="200"
                    height="200"
                  />
                </TableCell>
                <TableCell>{item.device.name}</TableCell>
                <TableCell>
                  <Rating
                    name="read-only"
                    value={item.device.rating}
                    readOnly
                  />
                </TableCell>
                <TableCell className="table-cell-price">
                  {discountedPrice > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                        {item.device.price} ₽
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontWeight: "bold" }}>
                      {item.device.price} ₽
                    </span>
                  )}
                  <IconButton
                    sx={{ float: "right" }}
                    aria-label="удалить"
                    size="small"
                    id={item.id}
                    onClick={Delete}
                  >
                    <CloseIcon id={item.id} style={{ color: "#B73939" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UserOrders;
