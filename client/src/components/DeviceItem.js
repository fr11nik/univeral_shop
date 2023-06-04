import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import { Image } from 'react-bootstrap';
import star from '../assets/star.png';

const DeviceItem = ({device}) => {
    const history = useHistory()   
    let discountedPrice = 0;
    if(device.discount){
        discountedPrice = device.price - (device.price * (device.discount.discountSize / 100));
    }  
    return (
        <Card sx={{ maxWidth: 345 ,margin:1}} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="175"
            image={process.env.REACT_APP_API_URL + device.img}
            alt={device.img}
            sx={{ objectFit: "contain" }}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {device.name}
            </Typography>
                <Typography className="d-flex align-items-center">
                       <div>{device.rating}</div>
                       <Image width={18} height={18} src={star}/>
                </Typography>  
            <Typography variant="body2" color="text.secondary">
            {discountedPrice > 0 ? (
                        <>
                            <span style={{fontWeight:700,color:'#dc3545'}} className="discounted-price">{discountedPrice.toFixed(2)} ₽</span>
                            <span style={{fontSize:12,textDecoration:'line-through',color:'#8c8c8c',marginLeft:5}} className="original-price">{device.price} ₽</span>                           
                        </>
                        ) : (                                  
                            <span style={{ fontWeight: 'bold' }}>{device.price} ₽</span>                                              
                        )}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}
export default DeviceItem;