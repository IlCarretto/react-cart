import React from 'react'
import styled from 'styled-components'
import { getCartProducts, getTotalPrice, removeFromCart, getTotalItems, addToCart } from '../../redux/Cart/cartSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import formatNumber from '../../utils/formatNumber';

const CartHeader = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid black;
`

const Section = styled.section`
background-color: white;
border-radius: 10px;
margin-top: 1rem;
border: 1px solid black;
`

const Cart = () => {
  const cartProducts = useAppSelector(getCartProducts);  
  const totalPrice = useAppSelector(getTotalPrice);
  const totalItems = useAppSelector(getTotalItems);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId));

  const handleAddToCart = (productId: number) => {
    const productToAdd = cartProducts.find((product) => product.id === productId);
    if (productToAdd) {
        dispatch(addToCart(productToAdd));
      }
  }

  return (
    <>
      <CartHeader>
        <h3>CART</h3>
        <p>{cartProducts.length} products added</p>
      </CartHeader>
      <Section className='p-3'>
        { cartProducts.length === 0 ? (<h3>Your cart is empty</h3>) : (<h3>Your cart contains:</h3>)}
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
              {
                cartProducts.map(product => {
                  return (
                    <>  
                      <tr>
                        <td className="align-middle">
                          <div className='d-flex justify-content-between'>
                            <p>{product.model}</p>
                            <button className='btn btn-danger' onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
                          </div>
                        </td>
                        <td className="align-middle">{product.number_code}</td>
                        <td className="align-middle">{product.selectedSize}</td>
                        <td className="align-middle">
                          <div className='d-flex justify-content-between'>
                            <p>{product.qty}</p>
                            <button className='btn btn-primary' onClick={() => handleAddToCart(product.id)}>Add</button>
                          </div>
                        </td>
                        <td className="align-middle">{formatNumber(product.price)}</td>
                      </tr>
                    </>
                  )
                })
              }
          </tbody>
        </table>
        <div className='text-end' style={{textDecoration: 'underline'}}>Total pieces: {totalItems}</div>
        <div className='text-end' style={{textDecoration: 'underline'}}>Total price: {formatNumber(totalPrice)}</div>
      </Section>
    </>
  )
}

export default Cart