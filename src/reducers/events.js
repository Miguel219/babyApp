import { combineReducers } from 'redux';
import omit from 'lodash/omit'

import * as types from '../types/envents';


const orderByBaby = (state = {}, action) => {
  switch (action.type) {
    case types.EVENT_ADDED: {
      return {
        ...state,
        [action.payload.babyId]: 
          ((state.includes(action.payload.babyId)) 
          ? [ ...state.action.payload.babyId, action.payload.eventId] 
          : [action.payload.eventId]),
      };
    }
    case types.EVENT_DELETED: {
      return state[action.payload.babyId].filter(action.payload.eventId);
    }
    default: {
      return state;
    }
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.EVENT_ADDED: {
      return {
        ...state,
        [action.payload.eventId]: action.payload,
      };
    }
    case types.EVENT_DELETED: {
      return omit(state, [action.payload.eventId]);
    }
    default: {
      return state;
    }
  }
};

const events = combineReducers({
  byId,
  orderByBaby,
});


export default events;


export const getEvent = (state, id) => state.byId[id];
export const getEvents = (state, babyId) => state.order[babyId].map(
  id => getEvent(state, id),
).filter(event => event != null);
