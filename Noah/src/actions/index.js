export * from './NavActions';
export * from './LearnActions';
export * from './messages';

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

export const selectWrongAnswer = (antwort) => {
  return {
    type: 'select_WrongAnswer',
    payload: antwort
  };
};

export const updateWrongAnswer = (antwort, qno) => {
  return {
    type: 'update_WrongAnswer',
    payload: antwort,
    index: qno
  };
};
export const resetWrong = () => {
  return {
    type: 'reset_wrong'
  };
};
export const resetWrongAnswer = () => {
  return {
    type: 'reset_wrongAnswer'
  };
};
export const mark = (qno) => {
  return {
    type: 'mark_question',
    payload: qno
  };
};
export const unmark = (qno) => {
  return {
    type: 'unmark_question',
    payload: qno
  };
};
export const resetMarked = () => {
  return {
    type: 'reset_marked'
  };
};
export const resetDefault = () => {
  return {
    type: 'reset_default'
  };
};
export const passFb = (fb) => {
  return {
    type: 'pass_Fb',
    payload: fb
  };
};
export const increment = () => {
  return {
    type: 'inc'
  };
};
export const decrement = () => {
  return {
    type: 'dec'
  };
};
export const safeAuswahl = (auswahl) => {
  return {
    type: 'safe_auswahl',
    payload: auswahl
  };
};
