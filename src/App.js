import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCart } from './store/actions/cart';
import './App.css';

import Layout from './containers/Layout/Layout';

import Home from './containers/Pages/Home/Home';
import Items from './containers/Pages/Items/Items';
import Product from './containers/Pages/Product/Product';
import Cart from './containers/Pages/Cart/Cart';

class App extends Component {
  componentDidMount(){
    if (localStorage.getItem('cart')) {
      this.props.setCart(localStorage.getItem('cart'));
      console.log('cart exists');
    }
  }
  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/cart" component={Cart} onEnter={this.scrollToTop}/>
            <Route path="/:category/:id/:color" component={Product} onEnter={this.scrollToTop}/>
            <Route path="/:category" component={Items} onEnter={this.scrollToTop}/>
            <Route path="/" component={Home} onEnter={this.scrollToTop}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCart: (cart) => dispatch(setCart(cart))
});

export default connect(null, mapDispatchToProps)(App);
