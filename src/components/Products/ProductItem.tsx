import React, {useState, useEffect} from 'react'
import { Product } from '../../redux/products/products'
import { Card, Img, CardText, Button, LastLabel, NormalLabel } from './style';
import "./style";
import { Select } from './style';
import { addToCart, getCartProducts } from '../../redux/Cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import formatNumber from '../../utils/formatNumber';
import { decreaseStock } from '../../redux/products/productSlice';

const ProductItem = ({model, number_code, price, img_url, itemsInStock, size, id}: Product) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products); 
  const cartProducts = useAppSelector(getCartProducts);
  
  // Stato del selected dell'item selezionato
  const [selectedSize, setSelectedSize] = useState("");
  // Funzione di change del select
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };
  // Funzione di submit dell'item
  const handleSelectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  // Funzione che prende come parametro l'id del prodotto, poi dichiara il singolo prodotto e dispatcha l'azione addToCart
  const addToCartHandler = (productId: number) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      const productWithSize = {...productToAdd, selectedSize}

      // Calcolo il singolo item nel carrello, se non esiste oppure se la quantità è minore di items in stock non aggiungerlo al carrello
      const cartItem = cartProducts.find(item => item.id === productToAdd.id);
      if (!cartItem || productToAdd.itemsInStock > 0) {
        dispatch(addToCart(productWithSize));
        dispatch(decreaseStock(productId));
      }
    }
  }

  return (
    <div className="col">
      <div className="card-group d-flex flex-wrap">
      <Card>
      {itemsInStock === 1 ? (
        <LastLabel>LAST</LastLabel>
      ) : (
        <NormalLabel>{itemsInStock}</NormalLabel>
      )}
        <div className='img-container' style={{height: '150px', position: 'relative'}}>
          <Img src={img_url}></Img>
        </div>
        <CardText className='p-2'>
          <h6>{model}</h6>
          <p>{number_code}</p>
          {/* Finché l'oggetto non viene aggiunto al cart, mostro la quantità presente nell'array products (itemsInStock), solo quando l'oggetto viene aggiunto, viene mostrata la quantità rimanente dall'array cart (qty)*/}
          <p className='mt-2'>Qty: { itemsInStock === 1 ? (
            <strong>{itemsInStock} <span className='text-danger'>Last piece, buy it now!</span></strong> 
            ) : itemsInStock === 0 ? (
              <strong className='text-danger'>not available</strong> ) : <strong>{itemsInStock}</strong>}</p>
          <p className='mt-2'>Price: <strong>{formatNumber(price) }</strong></p>
          <form className='d-flex justify-content-between mt-2' onSubmit={handleSelectSubmit}>
            <Select
              id=""
              onChange={handleSelectChange}
            >
                <option disabled selected>Select size</option>
                {size.map( (el,index) => {
                  return (
                    <option key={index} 
                    onClick={() => handleSelectChange}
                    value={el}>
                      {el}
                    </option>
                    )
                  })
                }
            </Select>
          <Button disabled={!selectedSize}
           onClick={() => {
            addToCartHandler(id)}}>
            Add
          </Button>
          </form>
        </CardText>
      </Card>
      </div>
    </div>
  )
}



export default ProductItem