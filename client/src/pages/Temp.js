import React, { useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import { DataGrid } from '@material-ui/data-grid';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {GRID_DEFAULT_LOCALE_TEXT_RU} from "../styles/localeTextConstants" 
import { fetchDeviceWithoutDiscount } from '../http/deviceAPI';
import { useEffect } from 'react';
const DiscountModal = ({ onSelectDevice }) => {  
    useEffect(() => {
        fetchDeviceWithoutDiscount().then(data => {
            setDevices(data);
        })
      }, []);
    const [devices,setDevices] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [discountSize, setDiscountSize] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDeviceSelect = (device) => {
      setSelectedDevice(device);
    };
  
    const handleDiscountSizeChange = (event) => {
      setDiscountSize(event.target.value);
    };
  
    const handleApplyDiscount = () => {
      if (selectedDevice) {
        const deviceWithDiscount = { ...selectedDevice, discountSize };
        onSelectDevice(deviceWithDiscount);
        setOpen(false);
      }
    };
    const columns = [
      { field: 'name', headerName: 'Наименование',flex:1  },
      { field: 'price', headerName: 'Цена',flex:1  },
      { field: 'rating', headerName: 'Рейтинг',flex:1 },
      {
        field: 'img',
        headerName: 'Изображение',
        width: 150,
        renderCell: (params) => (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={params.value} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        ),
      },
    ];
    
    const theme = createTheme({
        palette: {
          primary: {
            main: '#1976d2',
          },
        },
        typography: {
          fontFamily: 'Arial',
        },
        overrides: {
          MuiDataGrid: {
            root: {
              '& .MuiDataGrid-colCellTitle': {
                fontWeight: 'bold',
              },
            },
          },
        },
      });
      const handleSelectionChange = (newSelection) => {
        // Получить выбранную строку
        const selectedRow = rows.find((row) => row.id === newSelection[0]);
        console.log('Выбранная строка:', selectedRow);
      };  
    const rows = devices.map((device) => ({ id: device.id,name:device.name,price:device.price,rating:device.rating,img:process.env.REACT_APP_API_URL+device.img })); 
    
    return (
     <MuiThemeProvider theme={theme}>
        <Button variant="contained" onClick={handleOpen}>
          Открыть
        </Button>
        <Modal open={open} onClose={handleClose} className="modal-container">
          <div className="modal-content">
            <Typography variant="h5" component="div">
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
        </Modal>
    </MuiThemeProvider>
    );
  };

  export default DiscountModal;
