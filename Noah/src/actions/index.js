export * from './NavActions';
export * from './LearnActions';
/*
export * from './Quizactions';
*/
export const selectFb = (fb) => {
    return {
      type: 'select_fb',
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
export const wrong = (i) => {
  return {
    type: 'wrong',
    payload: i
  };
};
