
/**
 * Beautyland Project - Main Gallery Container
 */

import { connect } from 'react-redux';
import MainGallery from '../components/MainGallery';

const mapStateToProps = state => {
  const gallery = state.gallery['trends'];
  return {
    gname: 'trends',
    isFetching: gallery.isFetching,
    page: gallery.page,
    viewOffsetY: gallery.viewOffsetY,
    updatedAt: gallery.updatedAt,
    list: gallery.list
  };
};

const TrendsGallery = connect(
  mapStateToProps,
  null
)(MainGallery);

export default TrendsGallery;