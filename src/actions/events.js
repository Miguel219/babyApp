import * as types from '../types/events';


export const addEvent = (id, type, notes, date) => ({
  type: types.EVENT_ADDED,
  payload: { id, type, notes, date },
});

export const deleteEvent = id => ({
  type: types.EVENT_DELETED,
  payload: id,
});
