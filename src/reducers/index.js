import { combineReducers } from 'redux';

import babies, * as babiesSelectors from './babies';
import events, * as eventsSelectors from './events';


const reducer = combineReducers({
  babies,
  events,
});


export default reducer;


export const getBaby = (state, id) => babiesSelectors.getBabies(state.babies, id);
export const getBabies = state => babiesSelectors.getBabies(state.babies);
export const isSelectedBaby = state => babiesSelectors.isSelectedBaby(state.babies);
export const getSelectedBaby = state => babiesSelectors.getSelectedBaby(state.babies);

export const getEvent = (state, id) => eventsSelectors.getEvent(state.events, id);
export const getEvents = (state) => eventsSelectors.getEvents(state.events);
