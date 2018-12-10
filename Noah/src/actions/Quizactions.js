/*import {
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
*/
export const selectFb = (fb) => {
  return {
    type: 'select_Fb',
    payload: fb
  };
};

export const selectAnswer = (antwort) => {
  return {
    type: 'select_answer',
    payload: antwort
  };
};

export const updateAnswer = (antwort, qno) => {
  return {
    type: 'update_answer',
    payload: antwort,
    index: qno
  };
};

export const resetFb = () => {
  return {
    type: 'reset_fb'
  };
};

export const getBasisScore = (basisScore) => {
  return {
    type: 'get_BasisScore',
    payload: basisScore
  };
};
export const getSpezScore = (spezScore) => {
  return {
    type: 'get_SpezScore',
    payload: spezScore
  };
};
