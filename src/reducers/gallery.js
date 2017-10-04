
/**
 * Beautyland Project - Gallery reducer
 */

import { REQUEST_LIST, RECEIVE_LIST, SET_VIEW_OFFSET_Y } from '../actions';

const initialState = {
  latest: {
    isFetching: false,
    page: 0,
    viewOffsetY: 0,
    updatedAt: new Date(),
    list: []
  },
  trends: {
    isFetching: false,
    page: 0,
    viewOffsetY: 0,
    updatedAt: new Date(),
    list: []
  }
};

const gallery = (state = initialState, action) => {
  switch(action.type){
    case SET_VIEW_OFFSET_Y: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          viewOffsetY: action.offset
        }
      };
    }
    case REQUEST_LIST: {
      const newState = {
        ...state, 
        [action.name]: {
          ...state[action.name],
          isFetching: true
        }
      };
      return newState;
    }
    case RECEIVE_LIST:
      const originalList = state[action.name].list;
      const newList = originalList.concat(action.list);
      const newState = {
        ...state,
        [action.name]: {
          isFetching: false,
          endOfList: (action.list.length === 0)? true: false,
          page: action.page,
          list: newList,
          viewOffsetY: state[action.name].viewOffsetY,
          updatedAt: action.receivedAt
        }
      };
      return newState;
    default:
      return state;
  }
};

export default gallery;