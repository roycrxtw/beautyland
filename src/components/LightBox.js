
/**
 * Beautyland project - LightBox component
 */


import React, { Component } from 'react';
import './LightBox.css';

export default class LightBox extends Component{
  closeLightBox = () => {
    this.props.onCloseLightBox();
  };

  onInfoBox = (e) => {
    e.stopPropagation();
  };
  
  render(){
    let content = null;
    if(this.props.type === 'image'){
      content = <img className='imageBoxContent' src={this.props.content} alt=''/>;
    }else if(this.props.type === 'text'){
      content = (
      <div className='infoBoxContent' onClick={this.onInfoBox}>
        <div className='infoBoxHeader'>
          Post Information
          <i className='btnCloseInfoBox material-icons' onClick={this.closeLightBox}>close</i>
        </div>
        <ul>
          <li>{this.props.content.title}</li>
          <li>Author: {this.props.content.author}</li>
          <li>
            <a href={this.props.content.link} rel="noopener noreferrer" target='_blank'>
              {this.props.content.link}
            </a>
          </li>
          <li>{new Date(this.props.content.createdAt).toISOString()}</li>
          <li>view counts: {this.props.content.viewCount}</li>
        </ul>
      </div>);
    }else{
      content = <div>Good day, right?</div>;
    }

    return (
      <div>
      {
        this.props.isOpen && (
          <div className='box'>
            <div className='boxModal' onClick={this.closeLightBox}>
              {content}
            </div>
          </div>
        )
      }
      </div>
    );
  }
}