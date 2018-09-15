import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from './containers/Layout/Layout';

import Home from './containers/Pages/Home/Home';
import Items from './containers/Pages/Items/Items';
import Product from './containers/Pages/Product/Product';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:category" exact component={Items} />
            <Route path="/:category/:id/:color" exact component={Product} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
