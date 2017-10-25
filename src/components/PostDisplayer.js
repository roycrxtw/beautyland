
/**
 * Beautyland Project - Post Displayer component
 * @author Roy Lu(royvbtw)
 */

import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import 'whatwg-fetch';

import LightBox from './LightBox';
import NotFound from './NotFound';
import { getSafely } from '../util';
import './PostDisplayer.css';


function errorHandler({message} = {}){
  console.log(message);
}

export default class PostDisplayer extends Component{
  constructor(props){
    super(props);
    let postId;
    const match = /post\/(.*)/.exec(props.location.pathname);
    if(match){
      postId = match[1];
    }else{
      postId = undefined;
    }
    
    this.state = {
      postId,
      post: undefined,
      isBoxOpen: false,
      boxContentType: null,
      boxContent: null
    };

    if(!getSafely(() => props.location.state.post)){
      this.fetchPost(postId);
    }else{
      this.updateViewCount(postId);
      this.state = {
        ...this.state,
        post: props.location.state.post
      };
    }
  }

  gobackHandler = () => {
    this.props.history.goBack();
  };

  fetchPost = postId => {
    const url = `https://beautyland-api.royvbtw.uk/post/${postId}`;
  
    fetch(url).then( response => {
      return response.json();   // note: json() returns a promise
    }).then(data => {
      if(Object.keys(data).length === 0 && data.constructor === Object){
        // The API will return an empty object if the post doesn't exist.
        this.setState({ post: null });
      }else{
        this.setState({ post: data });
      }
    }).catch( err => {
      errorHandler({message: err.message});
    });
  };

  openImageBox = (index, event) => {
    const post = this.state.post;
    this.setState({
      isBoxOpen: true,
      boxContentType: 'image',
      boxContent: (post.images)? post.images[index].url: post.imgUrls[index]
    });
  };

  /**
   * Show post info in the lightbox
   */
  openInfoBox = () => {
    this.setState({
      isBoxOpen: true, 
      boxContentType: 'text',
      boxContent: this.state.post
    });
  };

  closeLightBox = () => {
    this.setState( {isBoxOpen: false} );
  }

  getPostImageList = () => {
    const post = this.state.post;
    const imglist = [];
    if(Object.keys(post).length === 0 && post.constructor === Object){
      return imglist;
    }
    if(post && post.images){
      post.images.forEach(element => {
        let temp = {};
        temp.src = element.url;
        temp.thumbnail = temp.src;
        // if the image has no width/height data, give them default value
        // CAUTION: the image aspect ratio will be broken.
        temp.thumbnailWidth = element.width || 300;  
        temp.thumbnailHeight = element.height || 300;
        imglist.push(temp);
      });
    }else if(post){  // compatible for old post data structure
      post.imgUrls.forEach(x => {
        const temp = {};
        temp.src = x;
        temp.thumbnail = x;
        // the old post data structure doesn't contain width/height data
        // we have to set some default value for them
        temp.thumbnailWidth = 300; 
        temp.thumbnailHeight = 300;
        imglist.push(temp);
      });
    }
    return imglist;
  };


  /**
   * Send a PUT reuqest to Beautyland api for update the view count for the specified post
   */
  updateViewCount = postId => { // #todo
    const url = 'https://beautyland-api.royvbtw.uk/post/' + postId;
    fetch(url, {method: 'PUT'}).then();  // simply send put request
  };


  render(){
    const { post, isBoxOpen, boxContentType, boxContent } = this.state;

    let content = null;
    if(post){
      content = (
        <div>
          <div className='btnPostInfo' title='Post information' onClick={this.openInfoBox}>
            <i className="material-icons">help_outline</i>
          </div>
          <Gallery images={this.getPostImageList()}
            rowHeight={300}
            enableImageSelection={false}
            onClickThumbnail={this.openImageBox}
          />
          <LightBox 
            isOpen={isBoxOpen} 
            type={boxContentType}
            content={boxContent} 
            onCloseLightBox={this.closeLightBox} 
          />
        </div>
      );
    }else if(post === undefined){
      content = (
        <NotFound>Loading post.</NotFound>
        // <div className='no-data-message'>
        //   The post does not exist.<br/>
        //   <Link className='icon-navi' to='/' title='back'>
        //     <i className="material-icons md-36">chevron_left</i>
        //   </Link>
        //   <div className='icon-navi' title='Visit Beautyland' onClick={this.gobackHandler}>
        //     <i className='material-icons md-36'>home</i>
        //   </div>
        // </div>
      );
    }else{
      content = (<NotFound>The post does not exist.</NotFound>);
    }

    return (
      <div className='postDisplayer'>
        <div className='btnBack' title='Go back' onClick={this.gobackHandler}>
          <i className="material-icons">chevron_left</i>
        </div>
        {content}
      </div>
    );
  }
}