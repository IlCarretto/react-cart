import React, {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getCartProducts } from '../redux/Cart/cartSlice';
import { useAppSelector } from '../redux/store';
import "./style";
import { Button, Box } from './style';

const Footer = () => {
  const cartProducts = useAppSelector(getCartProducts);
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;  
  

  return (
    <Box className={pathname !== "/" ? 'justify-content-between' : 'justify-content-end'}>
      {
        (pathname !== '/') ? (
          <Button onClick={() => {pathname === "/cart" ? navigate("/") : navigate("/cart") }}>
            Back
          </Button>
        ) : (
          ''
        )
      }
      <div className='d-flex align-items-center'>
        {
          pathname === "/checkout" ? (
            <Button onClick={() => navigate("/")}>
              Buy more
            </Button>
          ) : pathname === "/cart" ? (
            <>
            <p className='me-3'>{cartProducts.length} products added</p>
            <Button className={cartProducts.length === 0 ? 'a-disabled' : ''} onClick={() => {navigate("/checkout")}}>
                Go to Checkout
            </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/cart")}>
              Go to Cart
            </Button>
          )
        }
      </div>
    </Box>
  )
}

export default Footer