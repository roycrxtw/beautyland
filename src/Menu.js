
/**
 * Beautyland project - Menu Component
 */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component{
  constructor(props){
    super(props);
    const menuData = [
      {name: 'Home', to: '/'},
      {name: 'Trends', to: '/trends'},
      {name: 'About', to: '/about'},
    ];

    this.menuItems = menuData.map(x => 
      (
        <li key={x.name}>
          <NavLink 
            to={x.to}
            className='menuItem' 
            activeClassName='activeItem' 
            onClick={this.props.onNavLinkClick}
          >
            {x.name}
          </NavLink>
        </li>
      )
    );
  }

  render(){
    return (
      <div className='menu'>
        <ul className='menuList'>
          {this.menuItems}
        </ul>
        <p className='menuFooter'>Beaultyland<br/>2017</p>
      </div>
    );
  }
  
}