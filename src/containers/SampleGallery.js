
/**
 * Beautyland Project - Main Gallery Container
 */

import { connect } from 'react-redux';
import MainGallery from '../components/MainGallery';

const mapStateToProps = state => {
  const gallery = state.gallery['samples'];
  return {
    gname: 'samples',
    isFetching: gallery.isFetching,
    page: gallery.page,
    viewOffsetY: gallery.viewOffsetY,
    updatedAt: gallery.updatedAt,
    list: gallery.list
  };
};

const SampleGallery = connect(
  mapStateToProps,
  null
)(MainGallery);

export default SampleGallery;