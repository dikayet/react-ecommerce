import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from './containers/Layout/Layout';

import Home from './containers/Pages/Home/Home';
import Items from './containers/Pages/Items/Items';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:category" exact component={Items} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
