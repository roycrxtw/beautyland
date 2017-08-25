
/**
 * 
 */


import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './About';
import MainGallery from './MainGallery';

import 'whatwg-fetch';
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

class App extends Component {
  constructor(props){
    super(props);
    this.MAX_WIDTH = 400;
    
    const viewWidth = document.body.clientWidth;
    let galleryColumn;
    if(viewWidth < 480){
      galleryColumn = 2;
    }else if( viewWidth < 1024){
      galleryColumn = 3;
    }else{
      galleryColumn = 4;
    }

    this.state = {
      galleryColumn: galleryColumn
    };
  }

  toggleMenu = () => {
    document.getElementsByClassName('mask')[0].classList.toggle('isActive');
    document.getElementsByClassName('menu')[0].classList.toggle('isActive');
    document.getElementsByClassName('appContext')[0].classList.toggle('isActive');
    document.getElementsByClassName('btnMenu')[0].classList.toggle('isActive');
    document.getElementsByTagName('body')[0].classList.toggle('hasActiveMenu');    
  };

  galleryClickHandler = ({post, viewOffsetY = 0} = {}) => {
    console.log('App.galleryClickHandler(): offsetY=%s, post=', viewOffsetY, post);
    this.currentPost = post;
    this.viewOffsetY = viewOffsetY;
  }

  gobackHandler = () => {
    this.props.history.goBack();
  };

  // A button to open the menu
  MenuButton = (
    <div className='btnMenu' onClick={this.toggleMenu} title='menu'>
      <i className="material-icons">menu</i>
    </div>
  );

  render() {
    const LatestGallery = (props) => {
      return (
        <MainGallery 
          type='latest'
          cols={this.state.galleryColumn} 
          {...props}
        />
      );
    };

    const TrendsGallery = (props) => {
      //this.loadInitialPage('trends');
      return (
        <MainGallery 
          type='trends'
          cols={this.state.galleryColumn} 
          {...props}
        />
      );
    };

    return ( 
      <div className="App">
        <div className='appContext'>
          {Header}
          <Switch>
            <Route exact path='/' component={LatestGallery} />
            <Route exact path='/trends' component={TrendsGallery} />
            <Route exact path='/about' component={About} />
            <Route component={NotFound} />
          </Switch> 
        </div>
        {this.MenuButton}
        <div className='mask' onClick={this.toggleMenu}></div>
        <Menu onNavLinkClick={this.toggleMenu} />
      </div>
    );
  }
}

export default App;
