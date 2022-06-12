import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/product/:id' element={<ProductScreen />} exact />
              <Route path='/cart/:id?' element={<CartScreen />} />
            </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
