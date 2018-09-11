import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import WithNavigation from './containers/WithNavigation/WithNavigation';

import Home from './containers/Pages/Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <WithNavigation>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </WithNavigation>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
