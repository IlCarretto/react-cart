import React from 'react'
import { useAppSelector } from '../../redux/store';
import ProductItem from './ProductItem'
import styled from "styled-components";
import "./style";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductHeader = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid black;
`

const ProductsList = () => {
  const products = useAppSelector((state) => state.products);
  
  return (
    <>
      <section>
        <ProductHeader>
          <h3>LAST PRODUCTS AVAILABLE</h3>
          <p>{products.length} products available</p>
        </ProductHeader>
        <div className='products-list'>
          <div className='row'>
              {
                products.map((product) => {
                  return (
                    <ProductItem key={product.id} {...product}/>
                  )
                })
              }
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsList