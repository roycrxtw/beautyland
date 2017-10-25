
/**
 * Beautyland Project - NotFound Component
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';


export default class NotFound extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  goback = () => {
    this.props.history.goBack();
  }

  render(){
    const { children } = this.props;
    return (
      <div className='not-found'>
        <div className='children'>{children}</div>

        <div className='navi-block'>
          <div className='icon-navi' title='Go back' onClick={this.goback}>
            <i className="material-icons md-36">chevron_left</i>
          </div>
          <Link className='icon-navi' to='/' title='Visit Beautyland'>
            <i className='material-icons md-36'>home</i>
          </Link>
        </div>
      </div>
    );
  }
};

