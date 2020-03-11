import * as types from '../types/events';


export const addEvent = (babyId, eventId, type, notes, date) => ({
  type: types.EVENT_ADDED,
  payload: { babyId, eventId, type, notes, date },
});

export const deleteEvent = (babyId, eventId) => ({
  type: types.EVENT_DELETED,
  payload: {babyId, eventId},
});
