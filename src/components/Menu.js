
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
      {name: 'Random', to: '/samples'},
      {name: 'About', to: '/about'},
    ];

    this.menuItems = menuData.map( item => 
      (
        <li key={item.name}>
          <NavLink 
            to={item.to}
            className='menuItem' 
            activeClassName='activeItem' 
            onClick={this.props.onNavLinkClick}
          >
            {item.name}
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
        <p className='menuFooter'>Beaultyland<br/>2018</p>
      </div>
    );
  }
  
}