
/**
 * Beautyland project - LightBox component
 */


import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import './LightBox.css';

export default class LightBox extends Component{
  closeLightBox = () => {
    this.props.onCloseLightBox();
    this.postIdText = null;
  };

  onInfoBox = (e) => {
    e.stopPropagation();
  };

  onClickToCopy = (e) => {
    console.log(`click to copy`);
    this.postIdText.select();
    document.execCommand('copy');
  };
  
  render(){
    const tooltip = (
      <Tooltip id="tooltip">Click to copy</Tooltip>
    );

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
          Post ID<span style={{color: 'grey'}}>(Click to copy)</span>: 
            <OverlayTrigger placement="top" overlay={tooltip}>
              <input type='text' id='post-id' value={this.props.content.postId}
                onClick={this.onClickToCopy}
                ref={ (node) => {this.postIdText = node;} }
                readOnly
              />
            </OverlayTrigger>
          </li>
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