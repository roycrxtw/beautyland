
/**
 * 
 */


import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'whatwg-fetch';

import About from './About';
import MainGallery from './MainGallery';
import Menu from './Menu';

import './App.css';

const Header = (
  <div className="appHeader">
    <div className='app-title'>Beautyland</div>
  </div>
);

const NotFound = () => (
  <p>Hello, do you get lost?</p>
);

export default class App extends Component {
  toggleMenu = () => {
    document.getElementsByClassName('mask')[0].classList.toggle('isActive');
    document.getElementsByClassName('menu')[0].classList.toggle('isActive');
    document.getElementsByClassName('appContext')[0].classList.toggle('isActive');
    document.getElementsByClassName('btnMenu')[0].classList.toggle('isActive');
    document.getElementsByTagName('body')[0].classList.toggle('hasActiveMenu');
  };

  // A button to open the menu
  MenuButton = (
    <div className='btnMenu' onClick={this.toggleMenu} title='menu'>
      <i className="material-icons">menu</i>
    </div>
  );

  LatestGallery = (props) => {
    return (
      <MainGallery type='latest' {...props} />
    );
  };

  TrendsGallery = (props) => {
    return (
      <MainGallery type='trends' {...props} />
    );
  };

  render() {
    return ( 
      <div className="App">
        {this.MenuButton}
        <div className='mask' onClick={this.toggleMenu}></div>
        <Menu onNavLinkClick={this.toggleMenu} />
        
        <div className='appContext'>
        {Header}
          <div>
            <Switch>
              <Route exact path='/' component={this.LatestGallery} />
              <Route exact path='/trends' component={this.TrendsGallery} />
              <Route exact path='/about' component={About} />
              <Route component={NotFound} />
            </Switch> 
          </div>
        </div>
      </div>
    );
  }
}

