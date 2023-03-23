import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartProducts } from '../redux/Cart/cartSlice';
import { useAppSelector } from '../redux/store';
import "./style";
import { Button, Box } from './style';

const Footer = ({navigate}: {navigate: any}) => {
  const cartProducts = useAppSelector(getCartProducts);

  const handleNavigate = (path: any) => {
    navigate(path);
  }

  return (
    <Box>
        <p className='me-3'>{cartProducts.length} products added</p>
        <Button onClick={() => handleNavigate}>
            Go to Cart
        </Button>
    </Box>
  )
}

export default Footer