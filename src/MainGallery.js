
/**
 * Beautyland Project - Main Gallery
 */

import React, { Component } from 'react';
//import Gallery from 'react-photo-gallery';
import Gallery from 'react-grid-gallery';
import './MainGallery.css';

import PostDisplayer from './PostDisplayer';

const basedata = [{
  images: [
    {url: "./images/icon_beautyland.jpg", width: 185, height: 194}
  ]
}];

export default class MainGallery extends Component {
  constructor(props){
    super(props);

    let url = null;
    console.log('type=', props.type);
    if(props.type === 'trends'){
      url = 'http://beautyland-api.royvbtw.uk/trends';
    }else{
      url = 'http://beautyland-api.royvbtw.uk/latest';
    }

    this.state = {
      isGalleryMode: true,
      apiUrl: url,
      page: 1,
      postList: [],
      post: null,
      viewOffsetY: 0
    }

    this.loadPostData(url);   //set up initial data
  }

  componentDidUpdate(){
    if(this.state.isGalleryMode){
      window.scrollTo(0, Math.ceil(this.state.viewOffsetY));
    }else{
      window.scroll(0, 0);
    }
  }

  galleryClickHandler = (postIndex, event) => {
    // SAVE viewOffset and push to post:pid
    this.updateViewCount(this.state.postList[postIndex].postId);
    this.setState({
      isGalleryMode: false,
      viewOffsetY: window.scrollY,
      post: this.state.postList[postIndex]
    });
  };

  // to build the image list, it will be used in the Gallery component
  getGalleryImageList = () => {
      let imageListForGallery = [];
      let postList = [];
      // if the props.postList does not load yet, use some default image instead.
      if(!this.state.postList){
        postList = basedata;
      }else{
        postList = this.state.postList;
      }
      postList.forEach( post => {
        //const imageListLength = (post.images)? post.images.length: post.imgUrls.length;
        //const imageIndex = Math.floor(Math.random() * imageListLength);
        const imageIndex = 0;
        const imageData = {};
        imageData.src = (post.images)? post.images[imageIndex].url: post.imgUrls[imageIndex];
        imageData.thumbnail = imageData.src;
        imageData.thumbnailWidth = (post.images)? (post.images[imageIndex].width? post.images[imageIndex].width: 600): 600;
        imageData.thumbnailHeight = (post.images)? (post.images[imageIndex].height? post.images[imageIndex].height: 600): 600;
        imageListForGallery.push(imageData);
      });
      return imageListForGallery;
    };

  goBackHandler = () => {
    console.log('MG.goBackHandler() started.');
    //window.scroll(0, this.state.viewOffsetY);
    this.setState({
      isGalleryMode: true
    });
  };

  /**
   * Send a get reuqest to Beautyland api for increase the view count for specified post
   */
  updateViewCount = (postId) => { // #todo
    const url = 'http://beautyland-api.royvbtw.uk/post/' + postId;
    console.log('MG.updateViewCount, url=', url);
    fetch(url, {method: 'PUT'}).then(res => {
      console.log('updateViewCount() code=', res.status);
      console.log('updateViewCount(), res=', res);
    });  // simply send put request
  };

  /**
   * Click event handler for loadMore button.
   */
  loadMore = (event) => {
    console.log('App.loadMore() started');
    let viewOffsetY = window.scrollY;
    let newPageNumber = this.state.page + 1;
    let url = this.state.apiUrl + '/' + newPageNumber;
    this.loadPostData(url);

    this.setState({
      page: newPageNumber,
      viewOffsetY: viewOffsetY
    });
  };

  loadPostData = function(url){
    console.log('MG.loadPostData(). Fetching %s', url);
    fetch(url).then( function(response){
      //console.log('response status code=', response.status);
      return response.json();   // note: json() returns a promise
    }).then(data => {
      // console.log('data.length=', data.length);
      // console.log('typeof data=', typeof data);
      // console.log('data=', data);
      
      let currentList = this.state.postList;
      //console.log('is currentList an array: %s', Array.isArray(currentList));
      currentList = currentList.concat(data);
      this.setState({postList: currentList});
      //console.log('is postList an array=%s', Array.isArray(this.state.postList));
    }).catch( err => {
      console.log(err.message);
    });
  };

  test = () => {
    console.log('test');
  };

  render(){
    console.log('MG.render() started. isGalleryMode=%s', this.state.isGalleryMode);

    let content;
    if(this.state.isGalleryMode){
      content = (
        <div>
          <Gallery images={this.getGalleryImageList()}
            rowHeight='250'
            enableImageSelection={false}
            onClickThumbnail={this.galleryClickHandler}
          />
          {/* <Gallery 
            cols={this.props.cols} 
            photos={this.getGalleryImageList()} 
            onClickPhoto={this.galleryClickHandler}
          /> */}
          <div className='btnLoadmore' onClick={this.loadMore}>
            more
          </div>
        </div>
      );
    }else{
      content = (
        <PostDisplayer 
          cols={this.props.cols} 
          post={this.state.post}
          goBackHandler={this.goBackHandler} 
        />
      );
    }
    return (
      <div>{content}</div>
    )
  }
}