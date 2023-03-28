import React from 'react'
import styled from "styled-components";
import { useAppSelector } from '../../redux/store';
import { getTotalItems } from '../../redux/Cart/cartSlice';

const Box = styled.div`
width: 100%;
height: 500px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: white;
border: 1px solid black;
border-radius: 10px;
`

const Button = styled.a`
background-color: #5f729d;
color: white;
padding: .5rem 1rem;
border: none;
border-radius: 5px;
text-decoration: none;
cursor: pointer;
`

const Checkout = () => {
  const totalItems = useAppSelector(getTotalItems);

  return (
    <Box>
      <h4 className='mb-2'>Thank you!</h4>
      <h4 className='mb-4'>Your {totalItems} {totalItems === 1 ? 'product' : 'products'} will be shipped soon</h4>
      <Button href="/">
        Buy more
      </Button>
    </Box>
  )
}

export default Checkout