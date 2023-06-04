import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {Button} from "@mui/material";
const DeviceItem = ({device}) => {
    const history = useHistory()
    const discountedPrice = device.price - (device.price * (device.discounts.discountSize / 100));
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>                 
                </div>
                <div>{device.name}</div>
                <div className="product-price">
                        {device.discounts.discountSize > 0 ? (
                        <>
                            <span className="discounted-price">{discountedPrice.toFixed(2)} ₽</span>
                            <span className="original-price">{device.price} ₽</span>
                            
                        </>
                        ) : (
                            <>       
                            <span style={{ fontWeight: 'bold' }}>{device.price} ₽</span>
                            </>                     
                        )}
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
