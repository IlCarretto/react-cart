import React from 'react';
import './App.css';
import {createBrowserRouter,RouterProvider, useNavigate} from "react-router-dom";
import ProductsList from './components/Products/ProductsList';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import Footer from './Footer/Footer';
import styled from 'styled-components';

// Style
const Container = styled.div`
max-width: 1200px;
width: 80%;
margin: 0 auto;
`

// Router di lista prodotti e checkout
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsList />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

function App() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header/>
      <RouterProvider router={router}/>
      <Footer navigate={navigate}/>
    </Container>
  );
}

export default App;
