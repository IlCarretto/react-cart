import React from 'react'
import styled from 'styled-components'
import { getCartProducts, getTotalPrice, removeFromCart, getTotalItems, addToCart } from '../../redux/Cart/cartSlice'
import { increaseSizeQty, decreaseStock, increaseStock, decreaseSizeQty } from '../../redux/products/productSlice';
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
  const products = useAppSelector((state) => state.products);
  const totalPrice = useAppSelector(getTotalPrice);
  const totalItems = useAppSelector(getTotalItems);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (productId: number) => {
    dispatch(increaseStock(productId));
    dispatch(removeFromCart(productId));
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd?.selectedSize?.size) {
    dispatch(increaseSizeQty({productId: productId, sizeSelected: productToAdd?.selectedSize?.size}));
    }
  }

  const addToCartHandler = (productId: number) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      // Calcolo il singolo item nel carrello, se non esiste oppure se la quantità è minore di items in stock non aggiungerlo al carrello
      if (productToAdd.itemsInStock > 0 && productToAdd?.selectedSize?.size) {
        dispatch(addToCart(productToAdd));
        dispatch(decreaseStock(productId));
        dispatch(decreaseSizeQty({productId: productId, sizeSelected: productToAdd?.selectedSize?.size}));
      }
    }
  }

  const disableBtn = (productId: number) => {
    let qty;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        for (let j = 0; j < products[i].sizes.length; j++) {
          if (products[i].sizes[j].size === products[i]?.selectedSize?.size) {
            qty = products[i].sizes[j].qty;
            if (qty === 0 || products[i].itemsInStock === 0) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
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
                        <td className="align-middle">{product.selectedSize?.size}</td>
                        <td className="align-middle">
                          <div className='d-flex justify-content-between'>
                            <p>{product.qty}</p>
                            <button 
                            className='btn btn-primary' 
                            onClick={() => addToCartHandler(product.id)}
                            disabled={disableBtn(product.id)}>Add</button>
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