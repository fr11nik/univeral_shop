import React, { useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import { DataGrid } from '@material-ui/data-grid';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

const DiscountModal = ({ onSelectDevice }) => {
    const [open, setOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [discountSize, setDiscountSize] = useState(10);
    const devices = [
        { id: 1, name: 'Device 1', rating: 4.5, price: 100 },
        { id: 2, name: 'Device 2', rating: 3.8, price: 150 },
        { id: 3, name: 'Device 3', rating: 4.2, price: 200 },
        { id: 4, name: 'Device 4', rating: 4.0, price: 120 },
        { id: 5, name: 'Device 5', rating: 4.7, price: 180 },
      ];
        const russianLocaleText = {
            noRowsLabel: 'Нет данных',
            errorOverlayDefaultLabel: 'Произошла ошибка',
            columnMenuLabel: 'Меню столбца',
            columnMenuShowColumns: 'Показать столбцы',
            columnMenuFilter: 'Фильтр',
            columnMenuHideColumn: 'Скрыть столбец',
            columnMenuUnsort: 'Сбросить сортировку',
            columnMenuSortAsc: 'Сортировать по возрастанию',
            columnMenuSortDesc: 'Сортировать по убыванию',
            columnsPanelTextFieldLabel: 'Выберите столбцы',
            columnsPanelTextFieldPlaceholder: 'Столбцы',
            pageSizeOptionsLabel: 'Строк на странице',
            paginationFirstPageLabel: 'Первая страница',
            paginationLastPageLabel: 'Последняя страница',
            paginationNextPageLabel: 'Следующая страница',
            paginationPreviousPageLabel: 'Предыдущая страница',
            toolbarDensity: 'Плотность',
            toolbarDensityLabel: 'Плотность',
            toolbarDensityCompact: 'Компактная',
            toolbarDensityStandard: 'Стандартная',
            toolbarDensityComfortable: 'Комфортная',
            
        };
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
      { field: 'rating', headerName: 'Рейтинг',flex:1 },
      { field: 'price', headerName: 'Цена',flex:1  },
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
    
    const rows = devices.map((device) => ({ id: device.id, ...device }));
    
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
                localeText={russianLocaleText}
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
