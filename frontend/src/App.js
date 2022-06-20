import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
            <Routes>
              <Route exact path='/' element={<HomeScreen />}/>
              <Route exact path='/product/:id' element={<ProductScreen />}/>
              <Route exact path='/login' element={<LoginScreen />}/>
              <Route path='/cart/:id' element={<CartScreen />}/>
              <Route path='/cart' element={<CartScreen />} exact/>
            </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
