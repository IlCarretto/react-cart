import React from 'react'
import { Product, ProductSizePayload } from '../../redux/products/products'
import { Card, Img, CardText, Button, LastLabel, NormalLabel } from './style';
import "./style";
import { Select } from './style';
import { addToCart} from '../../redux/Cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import formatNumber from '../../utils/formatNumber';
import { decreaseSizeQty, decreaseStock, selectSize } from '../../redux/products/productSlice';

interface Props {
  product: Product
}

const ProductItem = ({product}: Props) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  // Funzione che prende come parametro l'id del prodotto, poi dichiara il singolo prodotto e dispatcha l'azione addToCart
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

  // Funzione che prende come parametri size e product (tipizzati da Sizes e Product), dichiara il productSize tipizzato da ProductSizePayload che è un oggetto formato da size e product e infine dispatcha il reducer selectSize che ha bisogno del parametro productSize
  const handleSetSize = (event: React.ChangeEvent<HTMLSelectElement>, product: Product) => {
    const productSize: ProductSizePayload = {
    size: {size: event.target.value, qty: 1},
    product: product
    };
    dispatch(selectSize(productSize));
  }

  return (
    <div className="col">
      <div className="card-group d-flex flex-wrap">
      <Card>
      {product.itemsInStock === 1 ? (
        <LastLabel>LAST</LastLabel>
      ) : (
        <NormalLabel>{product.itemsInStock}</NormalLabel>
      )}
        <div className='img-container' style={{height: '150px', position: 'relative'}}>
          <Img src={product.img_url}></Img>
        </div>
        <CardText className='p-2'>
          <h6>{product.model}</h6>
          <p>{product.number_code}</p>
          {/* Finché l'oggetto non viene aggiunto al cart, mostro la quantità presente nell'array products (itemsInStock), solo quando l'oggetto viene aggiunto, viene mostrata la quantità rimanente dall'array cart (qty)*/}
          <p className='mt-2'>Qty: { product.itemsInStock === 1 ? (
            <strong>{product.itemsInStock} <span className='text-danger'>Last piece, buy it now!</span></strong> 
            ) : product.itemsInStock === 0 ? (
              <strong className='text-danger'>not available</strong> ) : <strong>{product.itemsInStock}</strong>}</p>
          <p className='mt-2'>Price: <strong>{formatNumber(product.price) }</strong></p>
          <form className='d-flex justify-content-between mt-2'>
            <Select
              required
              name=""
              id=""
              onChange={(el) => handleSetSize(el, product)}
            >
                <option disabled selected>Select size</option>
                {product.sizes.map( (el,index) => {
                  return (
                    <option key={index}
                    value={el.size}
                    disabled={el.qty === 0}>
                      {el.size} [{el.qty} pz.]
                    </option>
                    )
                  })
                }
            </Select>
            {/* si deve disabilitare quando la qty della size selezionata è 0 */}
          <Button disabled={disableBtn(product.id)}

           onClick={(e) => {
            e.preventDefault()
            addToCartHandler(product.id)}}>
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