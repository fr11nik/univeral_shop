import React, { useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GRID_DEFAULT_LOCALE_TEXT_RU } from "../../styles/localeTextConstants";
import { fetchDeviceWithDiscount } from "../../http/deviceAPI";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import { deleteDiscountDevice } from "../../http/discountAPI";
const DiscountModal = ({ open, onClose }) => {
  useEffect(() => {
    fetchDeviceWithDiscount().then((data) => {
      setDevices(data);
    });
  }, []);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeleteDiscount = async () => {
    if (selectedDevice) {
      const deviceWithDiscount = { deviceId: selectedDevice.id };
      await deleteDiscountDevice(deviceWithDiscount);
      alert("Скидка успешно удалена");
      onClose();
    } else alert("Требуется выбрать один элемент");
  };
  const columns = [
    { field: "name", headerName: "Наименование", flex: 1 },
    { field: "price", headerName: "Цена", flex: 1 },
    { field: "priceSale", headerName: "Цена со скидкой", flex: 1 },
    { field: "rating", headerName: "Рейтинг", flex: 1 },
    {
      field: "img",
      headerName: "Изображение",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <image
            src={params.value}
            alt="Товар"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      ),
    },
  ];
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
    typography: {
      fontFamily: "Arial",
    },
    overrides: {
      MuiDataGrid: {
        root: {
          "& .MuiDataGrid-colCellTitle": {
            fontWeight: "bold",
          },
        },
      },
    },
  });
  const handleSelectionChange = (newSelection) => {
    // Получить выбранную строку
    const selectedRow = rows.find((row) => row.id === newSelection[0]);
    setSelectedDevice(selectedRow);
  };
  const rows = devices.map((device) => ({
    id: device.id,
    name: device.name,
    price: device.price,
    priceSale:
      device.price - device.price * (device.discount.discountSize / 100),
    rating: device.rating,
    img: process.env.REACT_APP_API_URL + device.img,
  }));
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose} className="modal-container md-24">
        <Container maxWidth="lg">
          <div className="modal-content" style={{ padding: 15 }}>
            <Typography variant="h5" component="div" style={{ margin: 15 }}>
              Выберете товар, на который хотите удалить скидку
            </Typography>
            <div className="datagrid-container">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                autoHeight
                localeText={GRID_DEFAULT_LOCALE_TEXT_RU}
                checkboxSelection
                onSelectionModelChange={handleSelectionChange}
              />
            </div>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteDiscount}
            >
              Удалить скидку
            </Button>
          </div>
        </Container>
      </Modal>
    </ThemeProvider>
  );
};
export default DiscountModal;
