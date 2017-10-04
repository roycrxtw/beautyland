
/**
 * Beautyland Project - Main Gallery Container
 */

import { connect } from 'react-redux';
import MainGallery from '../components/MainGallery';

const mapStateToProps = state => {
  const gallery = state.gallery['latest'];
  return {
    gname: 'latest',
    isFetching: gallery.isFetching,
    endOfList: gallery.endOfList,
    page: gallery.page,
    viewOffsetY: gallery.viewOffsetY,
    updatedAt: gallery.updatedAt,
    list: gallery.list
  };
};

const LatestGallery = connect(
  mapStateToProps,
  null
)(MainGallery);

export default LatestGallery;