import * as types from '../types/babies';


export const addBaby = (id, name, lastName) => ({
  type: types.BABY_ADDED,
  payload: { id, name, lastName },
});

export const selectBaby = id => ({
  type: types.BABY_SELECTED,
  payload: id,
});