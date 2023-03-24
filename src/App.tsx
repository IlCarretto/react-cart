import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate, Link} from "react-router-dom";
import ProductsList from './components/Products/ProductsList';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Footer from './Footer/Footer';
import styled from 'styled-components';
import Checkout from './components/Checkout/Checkout';

// Style
const Container = styled.div`
max-width: 1200px;
width: 80%;
margin: 0 auto;
`

function App() {

  return (
    <>
    <Container>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<ProductsList/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
        </Routes>
          <Footer/>
      </Router>
    </Container>
    </>
  );
}

export default App;
