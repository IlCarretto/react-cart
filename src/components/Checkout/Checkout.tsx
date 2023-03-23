import React from 'react'
import styled from 'styled-components'
import { getCartProducts, getTotalPrice, removeFromCart, getTotalItems } from '../../redux/Cart/cartSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store';

const ProductHeader = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
`

const Section = styled.section`
background-color: white;
border-radius: 10px;
border: 1px solid black;
`

const Checkout = () => {
  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);
  const totalItems = useAppSelector(getTotalItems);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId));

  return (
    <>
      <ProductHeader>
        <h3>CART</h3>
        <p>{cartProducts.length} products added</p>
      </ProductHeader>
      <hr />
      <Section className='p-3'>
        <h3>Your cart contains:</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Model</th>
              <th scope="col">SKU</th>
              <th scope="col">Size</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                cartProducts.map(product => {
                  return (
                    <>
                    <th scope="row">
                      <div className='d-flex justify-content-between'>
                        <p>{product.model}</p>
                        <button className='btn btn-danger' onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
                      </div>
                    </th>
                    <th scope="row">{product.number_code}</th>
                    <th scope="row">{product.size}</th>
                    <th scope="row">{product.qty}</th>
                    <th scope="row">{product.price}</th>
                    </>
                  )
                })
              }
            </tr>
          </tbody>
        </table>
        <div className='text-end' style={{textDecoration: 'underline'}}>Total pieces: {totalItems}</div>
        <div className='text-end' style={{textDecoration: 'underline'}}>Total price: € {totalPrice}</div>
      </Section>
    </>
  )
}

export default Checkout