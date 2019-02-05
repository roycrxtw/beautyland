
/**
 * Beautyland Project - Actions
 * @author Roy Lu(royxnatw)
 */

import { API_URL } from '../config'

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const CURRENT_PAGE = 'CURRENT_PAGE';
export const SET_VIEW_OFFSET_Y = 'SET_VIEW_OFFSET_Y';

export const requestList = (name) => {
  return {
    name,
    type: REQUEST_LIST
  }
};

export const setViewOffsetY = (name, offset) => {
  return {
    name,
    offset,
    type: SET_VIEW_OFFSET_Y
  };
}

export const receiveList = (name, page, list) => {
  return {
    name,
    page,
    list,
    type: RECEIVE_LIST,
    receivedAt: new Date()
  }
};

// Thunk middlewares

const fetchList = (name, page) => {
  return dispatch => {
    dispatch(requestList(name));
    let url;
    if (name === 'samples') {   // the samples path does not have a page parameter.
      url = `${API_URL}/${name}`;
    } else {
      url = `${API_URL}/${name}/${page}`;
    }
    
    return fetch(url).then( res =>
      res.json()
    ).then(json => {
      dispatch(receiveList(name, page, json));
    });
  };
};

// a thunk action
export const loadmore = (name) => {
  return (dispatch, getState) => {
    const nextPage = getState().gallery[name].page + 1;
    if (shouldFetchList(name, getState())) {
      dispatch(fetchList(name, nextPage));
    }
  };
};

function shouldFetchList(name, state) {
  const gallery = state.gallery[name];
  if (gallery.isFetching || gallery.endOfList) {
    return false;
  } else {
    return true;
  }
}



