import React, { useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GRID_DEFAULT_LOCALE_TEXT_RU } from "../../styles/localeTextConstants";
import { deleteDevices } from "../../http/deviceAPI";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import { fetchDevices } from "../../http/deviceAPI";
const DiscountModal = ({ open, onClose }) => {
  const [devices, setDevices] = useState({});
  const [selectedDevices, setSelectedDevices] = useState([]);
  useEffect(() => {
    fetchDevices(null, null, 1, 100).then((data) => {
      setDevices(data.rows);
    });
  }, []);
  const handleDeleteDiscount = async () => {
    const res = await deleteDevices(selectedDevices);
    if (res.status === 200) {
      alert("Товары успешно удалены!");
    } else alert("Ошибка сервера, повторите позднее");
    onClose();
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
  const handleSelectionChange = (selectionModel) => {
    setSelectedDevices(selectionModel);
  };
  var rows = [];
  if (devices !== null) {
    if (Object.prototype.toString.call(devices) === "[object Array]") {
      rows = devices.map((device) => ({
        id: device.id,
        name: device.name,
        price: device.price,
        rating: device.rating,
        img: process.env.REACT_APP_API_URL + device.img,
      }));
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose} className="modal-container md-24">
        <Container maxWidth="lg">
          <div className="modal-content" style={{ padding: 15 }}>
            <Typography variant="h5" component="div" style={{ margin: 15 }}>
              Выберете товар, который хотите удалить
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
              Удалить товар(-ы)
            </Button>
          </div>
        </Container>
      </Modal>
    </ThemeProvider>
  );
};
export default DiscountModal;
