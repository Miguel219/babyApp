import { combineReducers } from 'redux';

import * as types from '../types/babies';


const order = (state = [], action) => {
  switch (action.type) {
    case types.BABY_ADDED: {
      return [...state, action.payload.id];
    }
    default: {
      return state;
    }
  }
};

const byId = (state = [], action) => {
  switch (action.type) {
    case types.BABY_ADDED: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const selected = (state = null, action) => {
  switch (action.type) {
    case types.BABY_SELECTED: {
      var newState = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const babies = combineReducers({
  byId,
  order,
  selected,
});

export default babies;

export const getBaby = (state, id) => state.byId[id];
export const getBabies = state => state.order.map(
  id => getBaby(state, id),
).filter(baby => baby != null);
export const isSelectedBaby = state => ((state.selected !== null) ? true : false);
export const getSelectedBaby = state => (isSelectedBaby(state)) ? (state.selected) : (null);