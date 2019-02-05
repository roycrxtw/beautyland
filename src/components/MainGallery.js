
/**
 * Beautyland Project - Main Gallery
 */

import _ from 'lodash';
import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';

import { loadmore, setViewOffsetY } from '../actions'
import './MainGallery.css';

const basedata = [{
  images: [
    {url: "./images/icon_beautyland.jpg", width: 185, height: 194}
  ]
}];

export default class MainGallery extends Component {
  constructor(props) {
    super(props);
    window.addEventListener('scroll', this.scrollHandler);
    document.title = 'Beautyland';
  }

  componentWillMount() {
    if (this.props.list.length === 0) {   // load initial list data
      this.props.dispatch(loadmore(this.props.gname));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  /**
   * Check if the given ele object is displayed in the view.
   * @param {object} ele
   * @return {boolean} true if the given ele object is displayed in the window view.
   */
  isScrollIntoView = ele => {
    const top = ele.getBoundingClientRect().top;
    return (top <= window.innerHeight);
  };


  galleryClickHandler = (postIndex, event) => {
    const postId = this.props.list[postIndex].postId;
    
    this.props.dispatch(setViewOffsetY(this.props.gname, window.scrollY))

    this.props.history.push({
      pathname: `posts/${postId}`,
      state: {post: this.props.list[postIndex]}
    });
  };

  /**
   * To build the image list which will be used in the Gallery component
   */
  getGalleryImageList = () => {
    let imageListForGallery = [];
    let postList = [];
    // if the props.postList does not load yet, use some default image instead.
    if (this.props.list.length === 0) {
      postList = basedata;
    } else {
      postList = this.props.list;
    }
    console.log(`getGalleryImageList: postLit`, postList);
    postList.forEach(post => {
      const imageIndex = 0;
      if (_.isEmpty(post.images)) return;

      const imageData = {};
      imageData.src = post.images[imageIndex].url;
      imageData.thumbnail = imageData.src;
      imageData.thumbnailWidth = (post.images[imageIndex].width) ? post.images[imageIndex].width : 300;
      imageData.thumbnailHeight = (post.images[imageIndex].height) ? post.images[imageIndex].height : 300;
      imageListForGallery.push(imageData);
    });
    return imageListForGallery;
  };

  /**
   * Click event handler for loadMore button.
   */
  loadMore = event => {
    console.log(`component:MainGallery.loadMore(), event=`, event);
    if (this.props.isFetching || this.props.endOfList) return;
    
    const viewOffsetY = window.scrollY;
    const newPageNumber = this.props.page + 1;
    console.log(`Loading page ${newPageNumber}`);
    this.props.dispatch(loadmore(this.props.gname));
    this.props.dispatch(setViewOffsetY(this.props.gname, viewOffsetY));
  };

  scrollHandler = () => {
    if (!this.props.isFetching) {
      const btnLoadMore = document.getElementsByClassName('btnLoadmore')[0];
      const isButtonInView = this.isScrollIntoView(btnLoadMore);
      if (isButtonInView) {
        this.loadMore();
      }
    }
  };

  render() {    
    return (
      <div className='main-gallery'>
        <Gallery images={this.getGalleryImageList()}
          rowHeight={250}
          enableImageSelection={false}
          onClickThumbnail={this.galleryClickHandler}
        />
        <div className='btnLoadmore' disabled={this.props.endOfList}>
          <i className='material-icons'>expand_more</i>
        </div>
      </div>
    )
  }
}
