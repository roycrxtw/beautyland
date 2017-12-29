
/**
 * Beautyland Project - About Component
 */

import React, { Component } from 'react';

import './About.css';


export default class About extends Component {
  render() {
    return (
      <div className='about'>
        <p>This project is for demo purpose.</p>
        <p>Project started from Aug 2017 by Roy Lu(royvbtw)</p>
        <p>You can find the project codes in <a href='https://github.com/royvbtw/beautyland'>github</a></p>
        <p>And this is my place <a href='https://royvbtw.uk'>https://royvbtw.uk</a></p>

        <p>T2040</p>
      </div>
    );
  }
}