import React, { useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GRID_DEFAULT_LOCALE_TEXT_RU } from "../../styles/localeTextConstants";
import { fetchDeviceWithoutDiscount } from "../../http/deviceAPI";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import { createDiscountDevice } from "../../http/discountAPI";
const DiscountModal = ({ open, onClose }) => {
  useEffect(() => {
    fetchDeviceWithoutDiscount().then((data) => {
      setDevices(data);
    });
  }, []);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [discountSize, setDiscountSize] = useState(10);

  const handleDiscountSizeChange = (event) => {
    setDiscountSize(event.target.value);
  };

  const handleApplyDiscount = async () => {
    if (selectedDevice) {
      const deviceWithDiscount = { deviceId: selectedDevice.id, discountSize };
      await createDiscountDevice(deviceWithDiscount);
      alert("Скидка успешно добавлена");
      onClose();
    } else alert("Требуется выбрать один элемент");
  };
  const columns = [
    { field: "name", headerName: "Наименование", flex: 1 },
    { field: "price", headerName: "Цена", flex: 1 },
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
    rating: device.rating,
    img: process.env.REACT_APP_API_URL + device.img,
  }));
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose} className="modal-container md-24">
        <Container maxWidth="lg">
          <div className="modal-content" style={{ padding: 15 }}>
            <Typography variant="h5" component="div" style={{ margin: 15 }}>
              Выберете товар, на который хотите установить скидку
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
            <div className="discount-input">
              <Typography variant="body1" component="div">
                Процент скидки (%):
              </Typography>
              <input
                type="number"
                value={discountSize}
                onChange={handleDiscountSizeChange}
                min={1}
                max={99}
              />
            </div>
            <Button variant="contained" onClick={handleApplyDiscount}>
              Применить скидку
            </Button>
          </div>
        </Container>
      </Modal>
    </ThemeProvider>
  );
};
export default DiscountModal;
