import {
  CHOICE_UPDATE
} from './types';

export const actions = {
    fb1: () => ({ type: 'fb1' }),
    fb2: () => ({ type: 'fb2' }),
  };

  export const choiceUpdate = ({ prop, value }) => {
    return {
      type: CHOICE_UPDATE,
      payload: { prop, value }
    };
  }; 
