import React, {useState} from 'react'
import { Product } from '../../redux/products/products'
import { Card, Img, CardText, Button, LastLabel, NormalLabel } from './style';
import "./style";
import { Select } from './style';
import { addToCart, getCartProducts, getItemsQty } from '../../redux/Cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import formatNumber from '../../utils/formatNumber';

const ProductItem = ({model, number_code, price, img_url, itemsInStock, size, id}: Product) => {
  const state = useAppSelector((state) => state); // ottengo lo stato Redux
  
  const [showItemsInStock, setShowItemsInStock] = useState(false);
  
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products); 
  const cartProducts = useAppSelector(getCartProducts);
  const itemsQtyArray = getItemsQty(state); // array restituito da getItemsQty
  const itemsQtyTotal = itemsQtyArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // transformo l'array in valore
  console.log(itemsQtyTotal);
  
  
  // Stato del selected dell'item selezionato
  const [selectedSize, setSelectedSize] = useState("");
  // Funzione di change del select
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };
  // Funzione di submit dell'item
  const handleSelectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedSize);
    
  }

  // Funzione che prende come parametro l'id del prodotto, poi dichiara il singolo prodotto e dispatcha l'azione addToCart
  const addToCartHandler = (productId: number) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      const productWithSize = {...productToAdd, selectedSize}

      // Calcolo il singolo item nel carrello, se non esiste oppure se la quantità è minore di items in stock non aggiungerlo al carrello
      const cartItem = cartProducts.find(item => item.id === productToAdd.id);
      if (!cartItem || cartItem.qty < productToAdd.itemsInStock) {
        dispatch(addToCart(productWithSize));
        setShowItemsInStock(true);
      }
    }
  }

  return (
    <div className="col">
      <div className="card-group d-flex flex-wrap">
      <Card>
      {itemsQtyTotal === 1 ? (
        <LastLabel>LAST</LastLabel>
      ) : (
        <NormalLabel>{showItemsInStock ? itemsQtyTotal : itemsInStock}</NormalLabel>
      )}
        <div className='img-container' style={{height: '150px', position: 'relative'}}>
          <Img src={img_url}></Img>
        </div>
        <CardText className='p-2'>
          <h6>{model}</h6>
          <p>{number_code}</p>
          {/* Finché l'oggetto non viene aggiunto al cart, mostro la quantità presente nell'array products (itemsInStock), solo quando l'oggetto viene aggiunto, viene mostrata la quantità rimanente dall'array cart (qty)*/}
          <p className='mt-2'>Qty: { showItemsInStock && itemsQtyTotal === 1 ? (
            <strong>{itemsQtyTotal} <span className='text-danger'>Last piece, buy it now!</span></strong> 
            ) : showItemsInStock && itemsQtyTotal ? (
            <strong>{itemsQtyTotal}</strong> ) : showItemsInStock ? (<strong className='text-danger'>not available</strong>) : (<strong>{itemsInStock}</strong>)}</p>
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