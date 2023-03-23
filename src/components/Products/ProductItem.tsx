import React, {useState} from 'react'
import { Product } from '../../redux/products/products'
import { Card, Img, CardText, Button } from './style';
import "./style";
import { Select } from './style';
import { addToCart } from '../../redux/Cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const ProductItem = ({model, number_code, price, img_url, size, itemsInStock, id}: Product) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);  

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
      dispatch(addToCart(productWithSize));
    }
  }

  return (
    <div className="col">
      <Card>
        <div className='img-container' style={{height: '50%', position: 'relative'}}>
          <Img src={img_url}></Img>
        </div>
        <CardText className='p-2'>
          <h6>{model}</h6>
          <p>{number_code}</p>
          <p>Price: <strong>€{price}</strong></p>
          <form className='d-flex justify-content-between' onSubmit={handleSelectSubmit}>
            <Select
              id=""
              value={selectedSize} 
              onChange={handleSelectChange}
            >
                <option value="" disabled selected>Select size</option>
                {size.map( (el,index) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                    )
                  })
                }
            </Select>
          <Button onClick={() => addToCartHandler(id)}>
            Add
          </Button>
          </form>
        </CardText>
      </Card>
    </div>
  )
}



export default ProductItem