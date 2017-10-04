
/**
 * Beautyland Project - Actions
 * @author Roy Lu
 */

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const CURRENT_PAGE = 'CURRENT_PAGE';
export const SET_VIEW_OFFSET_Y = 'SET_VIEW_OFFSET_Y';

export const requestList = (name) => {
  return {
    type: REQUEST_LIST,
    name
  }
};

export const setViewOffsetY = (name, offset) => {
  return {
    type: SET_VIEW_OFFSET_Y,
    name,
    offset
  };
}

export const receiveList = (name, page, list) => {
  return {
    type: RECEIVE_LIST,
    name,
    page,
    list,
    receivedAt: new Date()
  }
};

// a thunk middleware
const fetchList = (name, page) => {
  return dispatch => {
    dispatch(requestList(name));
    const url = `https://beautyland-api.royvbtw.uk/${name}/${page}`;
    return fetch(url).then( res =>
      res.json()
    ).then(json => {
      dispatch(receiveList(name, page, json));
    });
  };
};

function shouldFetchList(name, state){
  const gallery = state.gallery[name];
  if(gallery.isFetching || gallery.endOfList){
    return false;
  }else{
    return true;
  }
}

// a thunk action
export const loadmore = (name) => {
  return (dispatch, getState) => {
    const nextPage = getState().gallery[name].page + 1;
    if(shouldFetchList(name, getState())){
      dispatch(fetchList(name, nextPage));
    }
  };
};



