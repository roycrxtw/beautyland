
/**
 * 
 */


import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './components/About';
import LatestGallery from './containers/LatestGallery';
import TrendsGallery from './containers/TrendsGallery';
import PostDisplayer from './components/PostDisplayer';
import NotFound from './components/NotFound'
import Menu from './components/Menu';
import './App.css';

const Header = (
  <div className="appHeader">
    <div className='app-title'>Beautyland</div>
  </div>
);

const PageNotFound = props => {
  console.log('PageNotFound: props', props);
  return (
    <NotFound {...props}>Do you get lost?</NotFound>
  );
}

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
              <Route exact path='(/|/latest)' component={LatestGallery} />
              <Route exact path='/trends' component={TrendsGallery} />
              <Route exact path='/about' component={About} />
              <Route path='/post' component={PostDisplayer} />
              <Route component={PageNotFound} />
            </Switch> 
          </div>
        </div>
      </div>
    );
  }
}

