import { combineReducers } from 'redux';
import omit from 'lodash/omit'

import * as types from '../types/events';


const orderByBaby = (state = {}, action) => {
  switch (action.type) {
    case types.EVENT_ADDED: {
      return {
        ...state,
        [action.payload.babyId]: 
          ((state.hasOwnProperty(action.payload.babyId)) 
          ? [ ...state[action.payload.babyId], action.payload.eventId] 
          : [action.payload.eventId]),
      };
    }
    case types.EVENT_DELETED: {
      return (state[action.payload.babyId].length === 1) 
        ? (omit(state, [action.payload.babyId])) 
        : ({
          ...state, 
          [action.payload.babyId]: state[action.payload.babyId]
          .filter(event => event !== action.payload.eventId)});
    }
    default: {
      return state;
    }
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.EVENT_ADDED: {
      const newPayload = Object.keys(action.payload).reduce((object, key) => {
        if (key !== 'babyId')
          object[key] = action.payload[key]
        return object
      }, {})
      return {
        ...state,
        [action.payload.eventId]: newPayload,
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
export const getEvents = state => {
  const events = {};
  Object.keys(state.orderByBaby).forEach(element => 
    events[element] = state.orderByBaby[element].map(
      id => getEvent(state, id),
    ).filter(event => event != null))
    return events;
};
